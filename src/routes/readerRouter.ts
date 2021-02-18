import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { areSomeBookIUndefined, getBookById, getBooks, getReaderById, isTooExpensive, makeOrder } from '../fileManager';
import { Order } from '../interfaces/Order';
import { readerAuthMiddleware } from '../middlewares/authMiddlewares';
import { validationMiddleware } from '../middlewares/validationMiddleware';
const router = Router({ mergeParams: true });

//vedere i writer
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
router.post('/coupons', ({ body: { id, money, deadline } }: Request, res: Response) => { })

//scrivere una recensione di un libro
router.post('/review', ({ body: { id, date, text, valutation } }: Request, res: Response) => { })

//ricaricare il conto
router.post('/refils', ({ body: { money } }: Request, res: Response) => { })

//modificare una recensione
router.put('/review', ({ body: { id, text, valutation } }: Request, res: Response) => { })

//eliminare un libro
router.delete('/books', (req: Request, res: Response) => { })

export default router;