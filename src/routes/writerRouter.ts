import { Router, Request, Response } from "express";
import { getWriterById, writeBook, isBookExists, deleteBook, editBook, } from "../fileManager";
import { Book } from "../models/Book"
const router = Router();

//vedere i writer
router.get('/', (req: Request, res: Response) => {
    res.status(200).json(getWriterById(req.params.id));
})

router.post('/book', ({ body: { title, price, launchDate, genre, description, authors, editors } }: Request, res: Response) => {
    res.status(201).json(writeBook(title, price, launchDate, genre, description, authors, editors));
})

router.delete('/book', ({ body: { id } }: Request, res: Response) => {
    if(!isBookExists(id)) {
        return res.status(404).json('Book not found')
    }
    deleteBook(id)
    return res.status(200).json('Book deleted')
})

router.put('/book', ({ body: {id, title, price, description} }: Request, res: Response) => {
    if (!isBookExists(id)) {
        return res.status(404).json('Book not found')
    }
    editBook(id,title,price,description)
    return res.status(200).json('Book edited')
})

router.get('/earnings', (req: Request, res: Response) => {
    res.status(200).json(getWriterById(req.params.id))
})

export default router;
