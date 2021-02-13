import express from 'express';
import authRouter from './routes/authRouter'
const app = express();

const PORT = 3001;



app.listen(PORT, () => {
    console.log(`Server start on ${PORT}`);
})