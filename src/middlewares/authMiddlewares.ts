import { Request, Response, NextFunction } from 'express';
import { getReaderById, getWriterById } from '../fileManager';

export const readerAuthMiddleware = ({ headers: { token }, params: { rId } }: Request, res: Response, next: NextFunction) => {
    console.log('sisi')
    const reader = getReaderById(rId as string);
    console.log(reader, token ?? '', (reader?.token === token ?? ''));
    (reader?.token === token ?? '') ? (console.log("sooooooooooooos"), next()) : res.status(403).json({ message: 'Not authorized' })
}

export const writerAuthMiddleware = ({ headers: { token }, params: { wId } }: Request, res: Response, next: NextFunction) => {
    const writer = getWriterById(wId as string);
    writer?.token === token ? next() : res.status(403).json({ message: 'Not authorized' })
}



export const allMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.path)
    if (req.path.includes('/reader')) { console.log('si'); readerAuthMiddleware(req, res, next); }
    else if (req.path.includes('/writer')) writerAuthMiddleware;
    else next();
}

// function(req, res, next) {
//     if(unauthorizedPaths.indexOf(req.path) === -1) {
//         if(req.user)
//             next()
//         else {
//             res.redirect('/auth/login')
//             res.end()
//         }
//     }
// }
