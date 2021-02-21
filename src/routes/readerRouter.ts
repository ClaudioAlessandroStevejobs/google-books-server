import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import {
    areSomeBookUndefined, getBooks, isTooExpensive, makeOrder, deleteBook, editReview,
    getBookById, getReaderById, isBookExists, writeReview, haveAlready, writeCoupon, refil, isReviewExistByReader, deleteReview
} from '../fileManager';
import { validationMiddleware } from '../middlewares/validationMiddleware';
const router = Router({ mergeParams: true });

router.get('/', ({ params: { rId } }: Request, res: Response) => res.status(200).json(getReaderById(rId)))

router.get('/books', ({ params: { rId } }: Request, res: Response) => res.status(200).json(getBooks(rId, 'READER')))

router.post('/order',
    validationMiddleware,
    ({ body: { inventory, couponId }, params: { rId } }: Request, res: Response) => {
        if (areSomeBookUndefined(inventory)) return res.status(404).json({ message: 'Some books not found' });
        if (isTooExpensive(rId, inventory, couponId)) return res.status(403).json({ message: 'Not enough money' });
        if (haveAlready(rId, inventory)) return res.status(403).json({ message: 'Have already book' });
        makeOrder(rId, inventory, couponId);
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
    body('email').isEmail().withMessage('Invalid email'),
    validationMiddleware,
    ({ body: { email, money }, params: { rId } }: Request, res: Response) => {
        if (!getReaderById(email)) return res.status(404).json({ message: 'Other reader not found' });
        if (money > getReaderById(rId)!.fund) return res.status(403).json({ message: 'Not enough money' });
        writeCoupon(rId, money, email);
        return res.status(201).json({ message: 'Coupon gifted' });
    }
)

router.post('/review',
    body('bookId').isUUID().withMessage('Invalid bookId'),
    body('title').isString().notEmpty().withMessage('Invalid title'),
    body('text').isString().notEmpty().withMessage('Invalid text'),
    body('valutation').isInt().custom(val => val === 1 || val === 2 || val === 3 || val === 4 || val === 5).withMessage('Invalid valutation'),
    validationMiddleware,
    ({ body: { bookId, title, text, valutation }, params: { rId } }: Request, res: Response) => {
        if (!getBookById(bookId)) return res.status(404).json({ message: 'Book not found' });
        if (isReviewExistByReader(bookId, rId)) return res.status(404).json({ message: ' Review exists' })
        writeReview(bookId, rId, title, text, valutation);
        return res.status(201).json({ message: 'Review added' });
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
    body('bookId').isUUID().withMessage('Invalid bookId'),
    body('reviewId').isUUID().withMessage('Invalid reviewId'),
    body('title').isString().notEmpty().withMessage('Invalid title'),
    body('text').isString().notEmpty().withMessage('Invalid text'),
    body('valutation').isInt().custom(val => val === 1 || val === 2 || val === 3 || val === 4 || val === 5).withMessage('Invalid valutation'),
    validationMiddleware,
    ({ body: { bookId, reviewId, title, text, valutation } }: Request, res: Response) => {
        if (!isReviewExistByReader(bookId, reviewId)) return res.status(404).json({ message: 'Review not exists' });
        editReview(bookId, reviewId, title, text, valutation);
        return res.status(200).json({ message: 'Review edited' });
    }
)


router.delete('/book',
    body('bookId').isUUID().notEmpty().withMessage('Invalid bookId'),
    validationMiddleware,
    ({ body: { bookId } }: Request, res: Response) => {
        if (!isBookExists(bookId)) return res.status(404).json({ message: 'Book not found' })
        deleteBook(bookId)
        return res.status(204).json({ message: 'Book deleted' })
    }
)

router.delete('/review',
    body('bookId').isUUID().withMessage('Invalid bookId'),
    body('reviewId').isUUID().withMessage('Invalid reviewId'),
    ({ body: { bookId, reviewId } }: Request, res: Response) => {
        if (!getBookById(bookId)) return res.status(404).json({ message: 'Book not found' });
        deleteReview(bookId, reviewId);
        return res.status(204).json({ message: 'Review deleted' })
    }
)

export default router;