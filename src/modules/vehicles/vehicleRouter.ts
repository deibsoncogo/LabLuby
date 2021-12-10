import { Router } from "express";
import { EnsuredAuthorizedMiddleware } from "middlewares/ensuredAuthorizedMiddleware";
import { CreateVehicleController } from "./useCases/createVehicle/createVehicleController";
import { FindAllVehicleFilterController } from "./useCases/findAllVehicleFilter/findAllVehicleFilterController";
import { FindOneVehicleController } from "./useCases/findOneVehicle/findOneVehicleController";

const vehicleRouter = Router();

vehicleRouter.use(EnsuredAuthorizedMiddleware);
vehicleRouter.post("/create", new CreateVehicleController().handle);
vehicleRouter.get("/one/:id", new FindOneVehicleController().handle);
vehicleRouter.get("/allFilter", new FindAllVehicleFilterController().handle);

export { vehicleRouter };
