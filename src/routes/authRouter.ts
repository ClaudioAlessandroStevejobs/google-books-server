import { Router, Request, Response } from 'express';
import { body, header } from 'express-validator';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import stringHash from 'string-hash';
import { deleteToken, getIdFromEmail, isEmailExists, isPasswordCorrect, writeToken, writeUser } from '../fileManager'

const router = Router();

router.post('/register',
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password').isString().notEmpty().customSanitizer(pass => pass = stringHash(pass)).trim().withMessage('Invalid password'),
    body('nationality').isString().notEmpty().trim().withMessage('Invalid nationality'),
    body('role').custom(r => r === 'READER' || r === 'WRITER').withMessage('Invalid role'),
    validationMiddleware,
    ({ body: { email, password, nationality, role } }: Request, res: Response) => {
        if (isEmailExists(email, role))
            return res.status(409).json({ message: 'Already exists' });
        writeUser(email, password, nationality, role);
        return res.status(201).json({ message: 'User registered', role });
    }
)

router.post('/login',
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password').isString().notEmpty().customSanitizer(pass => pass = stringHash(pass)).trim().withMessage('Invalid password'),
    body('role').custom(r => r === 'READER' || r === 'WRITER').withMessage('Invalid role'),
    validationMiddleware,
    ({ body: { email, password, role } }: Request, res: Response) => {
        if (!isEmailExists(email, role))
            return res.status(401).json({ message: 'Not authorized' });
        if (!isPasswordCorrect(password, role))
            return res.status(403).json({ message: 'Forbidden' });
        return res.status(201).json({ token: writeToken(email, role), id: getIdFromEmail(email, role) });
    }
)

router.post('/logout',
    header('token').isString().notEmpty().withMessage('Invalid token / No user logged'),
    validationMiddleware,
    ({ headers: { token } }: Request, res: Response) =>
        deleteToken(token as string) ? res.status(201).json({ message: 'Logout' }) : res.status(404).json({ message: 'Token not found' })
)

export default router;

