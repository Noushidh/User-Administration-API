import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authROutes from "./presentation/routes/auth.routes"
import { errorHandler } from "./presentation/middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authROutes)

app.use(errorHandler)


export default app;