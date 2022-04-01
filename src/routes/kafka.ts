import { Router } from "express";
import { KafkaController } from "../controllers/kafkaController";

const kafkaRouter = Router();

kafkaRouter.post("/", new KafkaController().handle);

export { kafkaRouter };
