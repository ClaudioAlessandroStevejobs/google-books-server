import { Request, Response, NextFunction } from 'express';
import { getReaderById, getWriterById } from '../fileManager';

export const readerAuthMiddleware = ({ headers: { token }, params: { rId } }: Request, res: Response, next: NextFunction) => {
    const reader = getReaderById(rId as string);
    reader?.token === token ? next() : res.status(403).json({ message: 'Not authorized' })
}

export const writerAuthMiddleware = ({ headers: { token }, params: { wId } }: Request, res: Response, next: NextFunction) => {
    const writer = getWriterById(wId as string);
    writer?.token === token ? next() : res.status(403).json({ message: 'Not authorized' })
}
