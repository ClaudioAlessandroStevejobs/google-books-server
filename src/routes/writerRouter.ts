import { Router, Request, Response } from "express";
import { body, param } from "express-validator";
import { getWriterById, writeBook, isBookExists, deleteBook, editBook, getEarnings, } from "../fileManager";
import { validationMiddleware } from "../middlewares/validationMiddleware";
const router = Router({ mergeParams: true });

router.get('/',
    ({ params: { wId } }: Request, res: Response) =>
        res.status(200).json(getWriterById(wId))
)

router.post(
    '/book',
    body('title').isString().notEmpty().withMessage('Invalid title'),
    body('price').isNumeric().withMessage('Invalid price'),
    body('genre').isString().notEmpty().withMessage('Invalid genre'),
    body('description').isString().notEmpty().withMessage('Invalid description'),
    body('editors').isArray().notEmpty().withMessage('Invalid editors'),
    validationMiddleware,
    ({ body: { title, price, genre, description, editors }, params: { wId } }: Request, res: Response) => {
        // if (isBookExists(wId)) return res.status(404).json('Book not found')
        writeBook(title, price, genre, description, wId, editors);
        return res.status(201).json();
    }
)

router.delete('/book',
    param('id').isNumeric(),
    validationMiddleware,
    ({ body: { id } }: Request, res: Response) => {
        if (!isBookExists(id)) return res.status(404).json('Book not found')
        deleteBook(id);
        return res.status(204).json('Book deleted');
    }
)

router.put('/book',
    validationMiddleware,
    body('title').isString().notEmpty().withMessage('Invalid title'),
    body('price').isNumeric().withMessage('Invalid price'),
    body('description').isString().notEmpty().withMessage('Invalid description'),
    ({ body: { id, title, price, description } }: Request, res: Response) => {
        if (!isBookExists(id)) return res.status(404).json('Book not found');
        editBook(id, title, price, description)
        return res.status(200).json('Book edited')
    }
)

router.get('/earnings', ({ params: { wId } }: Request, res: Response) =>
    res.status(200).json(getEarnings(wId))
)

export default router;
