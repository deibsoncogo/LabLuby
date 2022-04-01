import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import PurchaseController from "./controllers/purchaseController";
import Consumer from "./kafka/consumer";

const consumerPercentages = new Consumer({ groupId: "percentages-group" });
consumerPercentages.consume({ topic: "new-percentage", fromBeginning: false });

const purchaseController = new PurchaseController();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/purchase", purchaseController.purchase);

const server = app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

export const socketServer = new Server(server);

socketServer.on("connection", (socket) => {
  console.log("Connected to client");
});
