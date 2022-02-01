import { Router } from "express";
import { EmployeeIsAdminMiddleware } from "../middlewares/employeeIsAdminMiddleware";
import { EnsuredAuthorizedMiddleware } from "../middlewares/ensuredAuthorizedMiddleware";
import { CreateTransactionController } from "../modules/transactions/useCases/createTransaction/createTransactionController";
import { DeleteOneIdTransactionController } from "../modules/transactions/useCases/deleteOneIdTransaction/deleteOneIdTransactionController";
import { FindAllFilterTransactionController } from "../modules/transactions/useCases/findAllFilterTransaction/findAllFilterTransactionController";
import { FindOneIdTransactionController } from "../modules/transactions/useCases/findOneIdTransaction/findOneIdTransactionController";
import { UpdateOneIdTransactionController } from "../modules/transactions/useCases/updateOneIdTransaction/updateOneIdTransactionController";

const transactionRouter = Router();

transactionRouter.use(EnsuredAuthorizedMiddleware);
transactionRouter.post("/create", new CreateTransactionController().execute);
transactionRouter.get("/one/:id", new FindOneIdTransactionController().handle);
transactionRouter.get("/filter", new FindAllFilterTransactionController().handle);
transactionRouter.put("/one/:id", new UpdateOneIdTransactionController().handle);

transactionRouter.use(EmployeeIsAdminMiddleware);
transactionRouter.delete("/one/:id", new DeleteOneIdTransactionController().handle);

export { transactionRouter };
