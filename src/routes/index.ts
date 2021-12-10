import { Router } from "express";
import { vehicleRouter } from "modules/vehicles/vehicleRouter";
import { employeeRouter } from "./employeeRouter";

const indexRouter = Router();

indexRouter.use("/employee", employeeRouter);
indexRouter.use("/vehicle", vehicleRouter);

export { indexRouter };
