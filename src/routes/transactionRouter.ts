import { Router } from "express";
import { CreateTransactionController } from "../modules/transactions/useCases/createTransaction/createTransactionController";
import { FindAllFilterTransactionController } from "../modules/transactions/useCases/findAllFilterTransaction/findAllFilterTransactionController";
import { FindOneIdTransactionController } from "../modules/transactions/useCases/findOneIdTransaction/findOneIdTransactionController";
import { UpdateOneIdTransactionController } from "../modules/transactions/useCases/updateOneIdTransaction/updateOneIdTransactionController";

const transactionRouter = Router();

transactionRouter.post("/create", new CreateTransactionController().execute);
transactionRouter.get("/one/:id", new FindOneIdTransactionController().handle);
transactionRouter.get("/filter", new FindAllFilterTransactionController().handle);
transactionRouter.put("/one/:id", new UpdateOneIdTransactionController().handle);

export { transactionRouter };
