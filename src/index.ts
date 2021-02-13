import express from 'express';
import authRouter from './routes/authRouter'
import writerRouter from "./routes/writerRouter";
const app = express();

const PORT = 3001;


console.log('Jonny')
app.listen(PORT, () => {
  console.log(`Server start on ${PORT}`);
});
