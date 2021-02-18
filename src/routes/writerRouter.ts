import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { getWriterById, writeBook, isBookExists, deleteBook, editBook, } from "../fileManager";
const router = Router({ mergeParams: true });

// Aggiungere express validator
// Aggiungere bookExist nella post



router.get('/', ({ params: { wId } }: Request, res: Response) => {
    res.status(200).json(getWriterById(wId));
})

router.post(
    '/book',
    ({ body: { title, price, genre, description, authors, editors }, params: { wId } }: Request, res: Response) => {
        const trueAuthors: string[] = !authors ? [wId] : [wId, ...authors];
        res.status(201).json(writeBook(title, price, genre, description, trueAuthors, editors));
    })

router.delete('/book', ({ body: { id } }: Request, res: Response) => {
    if (!isBookExists(id)) return res.status(404).json('Book not found')
    deleteBook(id)
    return res.status(204).json('Book deleted')
})

router.put('/book', ({ body: { id, title, price, description } }: Request, res: Response) => {
    if (!isBookExists(id)) return res.status(404).json('Book not found')
    editBook(id, title, price, description)
    return res.status(200).json('Book edited')
})

// router.get('/earnings', (req: Request, res: Response) => {
//     res.status(200).json(getWriterById(req.params.id))
// })

export default router;
