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
transactionRouter.post("/createOne", new CreateOneTransactionController().execute);
transactionRouter.get("/findFilter", new FindFilterTransactionController().handle);
transactionRouter.get("/findOne/:id", new FindOneIdTransactionController().handle);

transactionRouter.use(EmployeeIsAdminMiddleware);
transactionRouter.put("/updateOne/:id", new UpdateOneTransactionController().handle);
transactionRouter.delete("/deleteOne/:id", new DeleteOneIdTransactionController().handle);

export { transactionRouter };
