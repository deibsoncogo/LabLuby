import { Router } from "express";
import { employeeRouter } from "./employeeRouter";

const indexRouter = Router();

indexRouter.use("/employee", employeeRouter);

export { indexRouter };
