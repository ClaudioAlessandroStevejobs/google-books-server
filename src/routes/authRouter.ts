import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import stringHash from 'string-hash';
import { Reader } from '../models/Reader';
import { } from '../fileManager'
const router = Router();

router.post('/register',
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isEmpty().customSanitizer(pass => pass = stringHash(pass)),
    body('nationality').isString().notEmpty().trim().withMessage('Invalid nationality'),
    validationMiddleware,
    ({ body: { email, password, nationality, role } }: Request, res: Response) => {

        const newReader = new Reader(email, password, nationality, 0);
    })

router.post('/login', ({ body: { email, password, role } }: Request, res: Response) => {
})

export default router;
