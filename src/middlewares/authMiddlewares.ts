import { Request, Response, NextFunction } from 'express';
import { getReaderById, getWriterById } from '../fileManager';

export const readerAuthMiddleware = (
    { headers: { token }, params: { rId } }: Request, res: Response, next: NextFunction) => {
    (getReaderById(rId as string)?.token || '') === token ? next() : res.status(403).json({ message: 'Not authorized' })
}

export const writerAuthMiddleware = ({ headers: { token }, params: { wId } }: Request, res: Response, next: NextFunction) => {
    (getWriterById(wId as string)?.token || '') === token ? next() : res.status(403).json({ message: 'Not authorized' })
}
