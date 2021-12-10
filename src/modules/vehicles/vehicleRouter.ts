import { Router } from "express";
import { EnsuredAuthorizedMiddleware } from "middlewares/ensuredAuthorizedMiddleware";
import { CreateVehicleController } from "./useCases/createVehicle/createVehicleController";
import { FindOneVehicleController } from "./useCases/findOneVehicle/findOneVehicleController";

const vehicleRouter = Router();

vehicleRouter.use(EnsuredAuthorizedMiddleware);
vehicleRouter.post("/", new CreateVehicleController().handle);
vehicleRouter.get("/:id", new FindOneVehicleController().handle);

export { vehicleRouter };
