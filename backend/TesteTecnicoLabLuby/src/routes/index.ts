import { Router } from "express";
import { employeeRouter } from "./employeeRouter";
import { transactionRouter } from "./transactionRouter";
import { vehicleRouter } from "./vehicleRouter";

const indexRouter = Router();

indexRouter.use("/employee", employeeRouter);
indexRouter.use("/vehicle", vehicleRouter);
indexRouter.use("/transaction", transactionRouter);

export { indexRouter };
