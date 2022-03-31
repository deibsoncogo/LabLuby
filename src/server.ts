import "reflect-metadata";
import "./database";
import "./containers";
import express from "express";
import "express-async-errors";
import cors from "cors";
import { Server } from "socket.io";
import { ErrorMiddleware } from "./middleware/errorMiddleware";
import { indexRouter } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRouter);
app.use(ErrorMiddleware);

const server = app.listen(3333, () => {
  console.log("Server is running on port 3333");
});

export const socketServer = new Server(server);

socketServer.on("connection", (socket) => {
  console.log(`Client connected to server socket - ${socket}`);
});
