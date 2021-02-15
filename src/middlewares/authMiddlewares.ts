import { Request, Response, NextFunction } from 'express';
import { getReaderByToken, getWriterByToken } from '../fileManager';

export const readerAuthMiddleware = ({ headers: { token }, params: { rId } }: Request, res: Response, next: NextFunction) => {
    const reader = getReaderByToken(token as string);
    reader?.getId() === rId ? next() : res.status(403).json({ message: 'Not authorized' })
}

export const writerAuthMiddleware = ({ headers: { token }, params: { wId } }: Request, res: Response, next: NextFunction) => {
    const reader = getWriterByToken(token as string);
    reader?.getId() === wId ? next() : res.status(403).json({ message: 'Not authorized' })
}
