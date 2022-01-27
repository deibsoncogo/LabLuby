import { Router } from "express";
import { employeeRouter } from "./employeeRouter";
import { vehicleRouter } from "./vehicleRouter";

const indexRouter = Router();

indexRouter.use("/employee", employeeRouter);
indexRouter.use("/vehicle", vehicleRouter);

export { indexRouter };
