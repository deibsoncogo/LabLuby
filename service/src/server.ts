import "reflect-metadata";
import "./database";
import "./containers";
import express from "express";
import "express-async-errors";
import { ErrorMiddleware } from "./middleware/errorMiddleware";
import { indexRouter } from "./routes";

const app = express();

process.env.TZ = "America/Sao_Paulo";

app.use(express.json());
app.use(indexRouter);
app.use(ErrorMiddleware);

app.listen(4444, () => console.log("Server is running on port 4444"));
