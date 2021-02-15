import { Router, Request, Response } from 'express';
const router = Router();

router.post('/register', ({ body: { email, password, nationality, role } }: Request, res: Response) => {
})

router.post('/login', ({ body: { email, password, role } }: Request, res: Response) => {
})

export default router;
