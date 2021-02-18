import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { deleteBook, editReviews, getBookById, getReaderById, isBookExists, writeReviews} from '../fileManager';
import { Order } from '../interfaces/Order';
import { readerAuthMiddleware } from '../middlewares/authMiddlewares';
import { validationMiddleware } from '../middlewares/validationMiddleware';
const router = Router({ mergeParams: true });

//vedere i writer
router.get('/',
    // param('id').isUUID().withMessage('Invalid id'),
    // validationMiddleware,
    ({ params: { rId } }: Request, res: Response) => { return res.status(200).json(getReaderById(rId)) })

//vedere i libri
router.get('/books',
    param('id').isUUID(),
    validationMiddleware,
    readerAuthMiddleware,
    (req: Request, res: Response) => {
        res.status(200).json(getBookById(req.params.id));
    })

//vedere le recensioni dei libri
router.get('/reviews',
    param('id').isUUID(),
    validationMiddleware,
    readerAuthMiddleware,
    (req: Request, res: Response) => {
        res.status(200).json(getReaderById(req.params.id))
    })

//fare un ordine
router.post('/orders',
    body('orders').isString().withMessage('Invalid order'),
    validationMiddleware,
    readerAuthMiddleware,
    ({ body: { inventory = [] } }: Request, res: Response) => {
        // addOrder(order);
        return res.status(201).json({ message: 'order effected' })
    })

//regalare un buono
router.post('/coupons', ({ body: { id, money, deadline } }: Request, res: Response) => {

 })

//scrivere una recensione di un libro
router.post('/review',
    body('id').isUUID(),
    body('date').isString().withMessage('Invalid date'),
    body('text').isString().withMessage('Invalid text'),
    body('valutation').isString().withMessage('Invalid valutation'),
    validationMiddleware,
    readerAuthMiddleware,
    ({ body: { id, date, text, valutation } }: Request, res: Response) => { 
    return res.status(201).json(writeReviews(id,date,text,valutation))

})

//ricaricare il conto
router.post('/refils', ({ body: { money } }: Request, res: Response) => { })


//modificare una recensione
router.put('/review', ({ body: { bId, reviewId,  title, text, valutation } }: Request, res: Response) => {
    if (!writeReviews) return res.status(204).json('Review not exist');
    editReviews(bId, reviewId, title, text, valutation);
    return res.status(200).json('Review edited')
 })


//eliminare un libro
router.delete('/books', 
    param('id').isNumeric(),
    validationMiddleware,
    readerAuthMiddleware,
    ({ body: { id } }: Request, res: Response) => {
    if (!isBookExists(id)) return res.status(404).json('Book not found')
    deleteBook(id)
        return res.status(204).json('Book deleted')
})

export default router;