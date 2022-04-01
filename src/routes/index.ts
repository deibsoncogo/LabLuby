import { Router } from "express";
import { kafkaRouter } from "./kafka";

const indexRouter = Router();

indexRouter.get("/", (request, response) => response.status(200).json("Hello word"));
indexRouter.use("/kafka", kafkaRouter);

export { indexRouter };
