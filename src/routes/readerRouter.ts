import {Router, Request, Response} from 'express';
import { getBookById, getReaderById } from '../fileManager';
const router = Router();

//vedere i writer
router.get('/',(req:Request,res:Response)=>{
    res.status(200).json(getReaderById(req.params.id));
})

//vedere i libri
router.get('/books',(req:Request,res:Response)=>{

})

//vedere le recensioni dei libri
router.get('/reviews',(req:Request,res:Response)=>{
})

//fare un ordine
router.post('/orders',({body:orders}:Request,res:Response)=>{})

//regalare un buono
router.post('/coupons',({body:{id,money,deadline}}:Request,res:Response)=>{})

//scrivere una recensione di un libro
router.post('/review',({body:{id,date,text,valutation}}:Request,res:Response)=>{})

//ricaricare il conto
router.post('/refils',({body:money}:Request,res:Response)=>{})

//modificare una recensione
router.put('/review',({body:{id,text,valutation}}:Request,res:Response)=>{})

//eliminare un libro
router.delete('/books',(req:Request,res:Response)=>{})

export default router;