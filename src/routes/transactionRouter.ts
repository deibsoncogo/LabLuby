import { Router } from "express";
import { EmployeeIsAdminMiddleware } from "../middlewares/employeeIsAdminMiddleware";
import { EnsuredAuthorizedMiddleware } from "../middlewares/ensuredAuthorizedMiddleware";
import { CreateOneTransactionController } from "../modules/transactions/useCases/createOneTransaction/createOneTransactionController";
import { DeleteOneIdTransactionController } from "../modules/transactions/useCases/deleteOneIdTransaction/deleteOneIdTransactionController";
import { FindFilterTransactionController } from "../modules/transactions/useCases/findFilterTransaction/findFilterTransactionController";
import { FindOneIdTransactionController } from "../modules/transactions/useCases/findOneIdTransaction/findOneIdTransactionController";
import { UpdateOneTransactionController } from "../modules/transactions/useCases/updateOneTransaction/updateOneTransactionController";

const transactionRouter = Router();

transactionRouter.use(EnsuredAuthorizedMiddleware);
transactionRouter.post("/create", new CreateOneTransactionController().execute);
transactionRouter.get("/one/:id", new FindOneIdTransactionController().handle);
transactionRouter.get("/filter", new FindFilterTransactionController().handle);
transactionRouter.put("/one/:id", new UpdateOneTransactionController().handle);

transactionRouter.use(EmployeeIsAdminMiddleware);
transactionRouter.delete("/one/:id", new DeleteOneIdTransactionController().handle);

export { transactionRouter };
