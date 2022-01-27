import { Router } from "express";
import { EmployeeIsAdminMiddleware } from "../middlewares/employeeIsAdminMiddleware";
import { EnsuredAuthorizedMiddleware } from "../middlewares/ensuredAuthorizedMiddleware";
import { CreateVehicleController } from "../modules/vehicles/useCases/createVehicle/createVehicleController";
import { DeleteVehicleController } from "../modules/vehicles/useCases/deleteVehicle/deleteVehicleController";
import { FindAllVehicleFilterController } from "../modules/vehicles/useCases/findAllVehicleFilter/findAllVehicleFilterController";
import { FindOneVehicleController } from "../modules/vehicles/useCases/findOneVehicle/findOneVehicleController";

const vehicleRouter = Router();

vehicleRouter.use(EnsuredAuthorizedMiddleware);
vehicleRouter.post("/create", new CreateVehicleController().handle);
vehicleRouter.get("/one/:id", new FindOneVehicleController().handle);
vehicleRouter.get("/allFilter", new FindAllVehicleFilterController().handle);

vehicleRouter.use(EmployeeIsAdminMiddleware);
vehicleRouter.delete("/delete/:id", new DeleteVehicleController().handle);

export { vehicleRouter };
