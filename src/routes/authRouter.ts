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
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password').isString().notEmpty().withMessage('Invalid password'),
    body('nationality').isString().notEmpty().trim().withMessage('Invalid nationality'),
    body('role').custom(r => r === 'READER' || r === 'WRITER').withMessage('Invalid role'),
    validationMiddleware,
    ({ body: { email, password, nationality, role } }: Request, res: Response) => {
        isEmailExists(email, role) && res.status(409).json({ message: 'Already exists' });
        const newUser = role === 'READER'
            ? new Reader(email, password, nationality)
            : new Writer(email, password, nationality)
        writeUser(newUser, role);
        return res.status(201).json({ message: 'User registered', role });
    })

router.post('/login', ({ body: { email, password, role } }: Request, res: Response) => {
})

export default router;

