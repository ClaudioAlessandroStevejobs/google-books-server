import { Router, Request, Response } from "express";
const router = Router();

router.post('/book', ({body : {title, price, genre, description, authors, editors} }: Request, res: Response) => {
})

router.delete('/book', ({body : {id} }: Request, res: Response) => {
})

router.put('/book', ({body : {title, price, description, editors} }: Request, res: Response) => {
})

router.get('/earnings', (req: Request, res: Response) => {
})

export default router;
