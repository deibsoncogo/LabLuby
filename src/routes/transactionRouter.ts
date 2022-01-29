import { Router } from "express";
import { CreateTransactionController } from "../modules/transactions/useCases/createTransaction/createTransactionController";
import { FindAllFilterTransactionController } from "../modules/transactions/useCases/findAllFilterTransaction/findAllFilterTransactionController";
import { FindOneIdTransactionController } from "../modules/transactions/useCases/findOneIdTransaction/findOneIdTransactionController";

const transactionRouter = Router();

transactionRouter.post("/create", new CreateTransactionController().execute);
transactionRouter.get("/one/:id", new FindOneIdTransactionController().handle);
transactionRouter.get("/filter", new FindAllFilterTransactionController().handle);

export { transactionRouter };
