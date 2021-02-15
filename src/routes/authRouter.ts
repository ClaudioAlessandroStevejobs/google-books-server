import express, { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import stringHash from 'string-hash';
import { Reader } from '../models/Reader';
import { isEmailExists, writeUser } from '../fileManager'
import { User } from '../interfaces/User';
import { Writer } from '../models/Writer';
const router = Router();

router.post('/register',
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isEmpty(),
    body('nationality').isString().notEmpty().trim().withMessage('Invalid nationality'),
    body('role').custom(r => r === 'READER' || r === 'WRITER').withMessage('Invalid role'),
    // validationMiddleware,
    (req: Request, res: Response) => {
        console.log(req.body);
        isEmailExists(req.body.email, req.body.role) && res.status(409).json({ message: 'Already exists' });
        const newUser = req.body.role === 'READER'
            ? new Reader(req.body.email, req.body.password, req.body.nationality, 0)
            : new Writer(req.body.email, req.body.password, req.body.nationality, 0)
        writeUser(newUser, req.body.role);
    })

router.post('/login', ({ body: { email, password, role } }: Request, res: Response) => {
})

export default router;

