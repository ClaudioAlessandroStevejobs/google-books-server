import {Request, Response, NextFunction} from 'express';
import { getReaderbyToken, readAccount } from '../fileManager';
import { User } from '../interfaces/User';


export const readerAuthMiddleware = ({headers: {token}, params: {rId}}: Request, res: Response, next : NextFunction) => {
    const reader = getReaderbyToken();
    reader.getId() === rId  ? next() : res.status(403).json({message: 'Not authorized'})
}

export const writerAuthMiddleware = () => {
    
}

// export const customerAuthMiddleware = ({
//     headers : {token}, params : {bankId, accountId}
// } : Request, res : Response, next : NextFunction) => {
//     const user = authToken(token as string);
//     const account = readAccount(bankId, accountId)
//     user?.role === 'CUSTOMER' 
//         ? account?.getEmail() === user.email
//             ? next()
//             : res.status(401).json({message: 'Not authorized'})
//         : res.status(403).json('Invalid token');
// }

// export const adminAuthMiddleware = ({
//     headers : {token}, params: {bankId}
// } : Request, res : Response, next : NextFunction) => {
//     const user = authToken(token as string);
//     user?.role === 'ADMIN'
//         ? user?.bankId === bankId
//             ? next()
//             : res.status(401).json({message: 'Not authorized'})
//         : res.status(403).json({message: 'Invalid token'});
// }

// export const superAdminAuthMiddleware = ({
//     headers : {token}
// } : Request, res : Response, next : NextFunction) => {
//     const user = authToken(token as string);
//     user?.role === 'SUPER_ADMIN' ? next() : res.status(403).json({message: 'Not authorized'});
// }