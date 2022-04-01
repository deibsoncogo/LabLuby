import { Router } from "express";
import { KafkaController } from "../controllers/kafkaController";
import { TransactionController } from "../controllers/transactionController";

const kafkaRouter = Router();

kafkaRouter.post("/", new KafkaController().handle);
kafkaRouter.post("/transaction", new TransactionController().handle);

export { kafkaRouter };
