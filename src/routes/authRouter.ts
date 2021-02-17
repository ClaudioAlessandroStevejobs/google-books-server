import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import stringHash from 'string-hash';
import { isEmailExists, isPasswordCorrect, writeToken, writeUser } from '../fileManager'

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
    })

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
        return res.status(201).send(writeToken(email, role));
    })

router.post('/logout', (req: Request, res: Response) => {

})
export default router;

