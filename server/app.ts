import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

export default app;
