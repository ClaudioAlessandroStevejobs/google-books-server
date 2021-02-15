import express from "express";
import authRouter from "./routes/authRouter";
import writerRouter from "./routes/writerRouter";
import readerRouter from "./routes/readerRouter";
const app = express();
app.use('/auth', authRouter);
app.use('/writer/:id', writerRouter);
app.use('/reader/:id', readerRouter);
const PORT = 3001;


app.listen(PORT, () => {
    console.log(`Server start on ${PORT}`);
});
