import express from "express";
import authRouter from "./routes/authRouter";
import writerRouter from "./routes/writerRouter";
import readerRouter from "./routes/readerRouter";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:4200",
  preflightContinue: false,
};
app.use(cors(options));
app.use("/auth", authRouter);
app.use("/writer/:id", writerRouter);
app.use("/reader/:id", readerRouter);
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server start on ${PORT}`);
});
