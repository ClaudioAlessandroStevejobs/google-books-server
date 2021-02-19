import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { areSomeBookIUndefined, getBooks, isTooExpensive, makeOrder, deleteBook, editReview, getBookById, getReaderById, isBookExists, writeReviews, deleteReviews, isReviewExistByReader } from '../fileManager';
import { } from '../fileManager';
import { Order } from '../interfaces/Order';
import { readerAuthMiddleware } from '../middlewares/authMiddlewares';
import { validationMiddleware } from '../middlewares/validationMiddleware';
const router = Router({ mergeParams: true });

//vedere i reader
router.get('/',
    ({ params: { rId } }: Request, res: Response) => res.status(200).json(getBooks(rId, 'READER')))

//vedere i libri
router.get('/books',
    (req: Request, res: Response) => res.status(200).json(getBookById(req.params.id)))

//vedere le recensioni dei libri
// router.get('/reviews',
//     param('id').isUUID(),
//     validationMiddleware,
//     readerAuthMiddleware,
//     (req: Request, res: Response) => {
//         // res.status(200).json(getReviewsById(req.params.id))
//     })

//fare un ordine
router.post('/order',
    validationMiddleware,
    readerAuthMiddleware,
    ({ body: { inventory }, params: { rId } }: Request, res: Response) => {
        if (areSomeBookIUndefined(inventory)) return res.status(404).json({ message: 'Some books not found' });
        if (isTooExpensive(rId, inventory)) return res.status(403).json({ message: 'Not enough money' });
        makeOrder(rId, inventory);
        return res.status(201).json({ message: 'order effected' })
    })

//regalare un buono
// router.post('/coupons', ({ body: { id, money, deadline } }: Request, res: Response) => {

// })

//scrivere una recensione di un libro
router.post('/review',
    body('bId').isUUID().withMessage('Invalid bId'),
    body('text').isString().withMessage('Invalid text'),
    body('valutation').isNumeric().withMessage('Invalid valutation'),
    validationMiddleware,
    readerAuthMiddleware,
    ({ body: { bId, title, text, valutation }, params: { rId } }: Request, res: Response) => {
        if (!getBookById(bId)) return res.status(404).json({ message: 'Book not found' });
        if(isReviewExistByReader(bId,rId)) return res.status(404).json({message: ' Review exists'})
        writeReviews(bId,rId, title, text, valutation);
        return res.status(201).json('Review added');
        //se esiste già la recensione non la deve inserire

    })

//ricaricare il conto
router.post('/refils', ({ body: { money } }: Request, res: Response) => { })


//modificare una recensione
router.put('/review',
    ({ body: { bId, reviewId, title, text, valutation } }: Request, res: Response) => {
        if (!isReviewExistByReader(bId,reviewId)) return res.status(404).json({message: 'Review not exists'});
    editReview(bId, reviewId, title, text, valutation);
        return res.status(200).json({ message: 'Review edited' });
})


//eliminare un libro
router.delete('/books',
    param('id').isNumeric(),
    validationMiddleware,
    readerAuthMiddleware,
    ({ body: { id } }: Request, res: Response) => {
        if (!isBookExists(id)) return res.status(404).json({message: 'Book not found'})
        deleteBook(id)
        return res.status(204).json({ message: 'Book deleted' })
    })


router.delete('/review',
    ({ body: { bId, rId } }: Request, res: Response) => {
        if (!getBookById(bId)) return res.status(404).json({ message: 'Book not found' });
        deleteReviews(bId, rId);
        return res.status(204).json({ message: 'Review deleted' })
    })

export default router;