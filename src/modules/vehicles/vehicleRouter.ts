import { Router } from "express";
import { EnsuredAuthorizedMiddleware } from "middlewares/ensuredAuthorizedMiddleware";
import { CreateVehicleController } from "./useCases/createVehicle/createVehicleController";

const vehicleRouter = Router();

vehicleRouter.use(EnsuredAuthorizedMiddleware);
vehicleRouter.post("/", new CreateVehicleController().handle);

export { vehicleRouter };
