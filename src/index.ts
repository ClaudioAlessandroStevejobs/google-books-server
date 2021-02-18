import express from "express";
import authRouter from "./routes/authRouter";
import writerRouter from "./routes/writerRouter";
import readerRouter from "./routes/readerRouter";
import bodyParser from "body-parser";
import cors from "cors";
import { writerAuthMiddleware, readerAuthMiddleware } from "./middlewares/authMiddlewares";
import { body } from "express-validator";

const app = express();
const PORT = 3001;
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(options));
app.use("/auth", authRouter);
app.use("/writer/:wId", writerAuthMiddleware, writerRouter);
app.use(
	"/reader/:rId",
	readerAuthMiddleware,
	readerRouter
);

app.listen(PORT, () => {
	console.log(`Server start on ${PORT}`);
});
