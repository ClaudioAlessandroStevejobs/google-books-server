import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import {
    areSomeBookIUndefined, getBooks, isTooExpensive, makeOrder, deleteBook, editReview,
    getBookById, getReaderById, isBookExists, writeReviews, haveAlready, writeCoupon, refil
} from '../fileManager';
import { readerAuthMiddleware } from '../middlewares/authMiddlewares';
import { validationMiddleware } from '../middlewares/validationMiddleware';
const router = Router({ mergeParams: true });


router.get('/', ({ params: { rId } }: Request, res: Response) => res.status(200).json(getReaderById(rId)))

router.get('/books', ({ params: { rId } }: Request, res: Response) => res.status(200).json(getBooks(rId, 'READER')))

router.post('/order',
    validationMiddleware,
    readerAuthMiddleware,
    ({ body: { inventory }, params: { rId } }: Request, res: Response) => {
        if (areSomeBookIUndefined(inventory)) return res.status(404).json({ message: 'Some books not found' });
        if (isTooExpensive(rId, inventory)) return res.status(403).json({ message: 'Not enough money' });
        if (haveAlready(rId, inventory)) return res.status(403).json({ message: 'Have already book' });
        makeOrder(rId, inventory);
        return res.status(201).json({ message: 'Order effected' });
    }
)

router.post('/coupon',
    body('money').isNumeric().withMessage('Invalid money'),
    validationMiddleware,
    ({ body: { money }, params: { rId } }: Request, res: Response) => {
        if (money > getReaderById(rId)!.fund) return res.status(403).json({ message: 'Not enough money' });
        writeCoupon(rId, money);
        return res.status(201).json({ message: 'Coupon bought' });
    }
)

router.post('/gift',
    body('money').isNumeric().withMessage('Invalid money'),
    body('otherRId').isUUID().withMessage('Invalid other id'),
    validationMiddleware,
    ({ body: { otherRId, money }, params: { rId } }: Request, res: Response) => {
        if (!getReaderById(otherRId)) return res.status(404).json({ message: 'Other reader not found' });
        if (money > getReaderById(rId)!.fund) return res.status(403).json({ message: 'Not enough money' });
        writeCoupon(rId, money, otherRId);
        return res.status(201).json({ message: 'Coupon gifted' });
    }
)

//scrivere una recensione di un libro
router.post('/review',
    body('bId').isUUID().withMessage('Invalid bId'),
    body('text').isString().withMessage('Invalid text'),
    body('valutation').isNumeric().withMessage('Invalid valutation'),
    validationMiddleware,
    readerAuthMiddleware,
    ({ body: { bId, title, text, valutation }, params: { rId } }: Request, res: Response) => {
        if (!getBookById(bId)) return res.status(404).json({ message: 'Book not found' });
        writeReviews(bId, rId, title, text, valutation);
        return res.status(201).json('Review added');

    }
)

router.post('/refils',
    body('money').isNumeric().withMessage('Invalid money'),
    validationMiddleware,
    ({ body: { money }, params: { rId } }: Request, res: Response) => {
        refil(money, rId);
        return res.status(201).json({ message: 'Refil' });
    }
)

router.put('/review',
    ({ body: { bId, reviewId, title, text, valutation } }: Request, res: Response) => {
        if (!isBookExists(reviewId)) return res.status(404).json('Review not exists');
        editReview(bId, reviewId, title, text, valutation);
        return res.status(200).json('Review edited');
    }
)

router.delete('/books',
    param('id').isNumeric(),
    validationMiddleware,
    readerAuthMiddleware,
    ({ body: { id } }: Request, res: Response) => {
        if (!isBookExists(id)) return res.status(404).json('Book not found')
        deleteBook(id)
        return res.status(204).json('Book deleted')
    }
)


router.delete(
    '/review', (req: Request, res: Response) => {

    }
)

export default router;