import { Router } from "express";
import { CreateTransactionController } from "../modules/transactions/useCases/createTransaction/createTransactionController";

const transactionRouter = Router();

transactionRouter.post("/create", new CreateTransactionController().execute);

export { transactionRouter };
