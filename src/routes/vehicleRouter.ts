import { Router } from "express";
import { EmployeeIsAdminMiddleware } from "../middlewares/employeeIsAdminMiddleware";
import { EnsuredAuthorizedMiddleware } from "../middlewares/ensuredAuthorizedMiddleware";
import { CreateOneVehicleController } from "../modules/vehicles/useCases/createOneVehicle/createOneVehicleController";
import { DeleteOneIdVehicleController } from "../modules/vehicles/useCases/deleteOneIdVehicle/deleteOneIdVehicleController";
import { FindFilterVehicleController } from "../modules/vehicles/useCases/findFilterVehicle/findFilterVehicleController";
import { FindOneIdVehicleController } from "../modules/vehicles/useCases/findOneIdVehicle/findOneIdVehicleController";

const vehicleRouter = Router();

vehicleRouter.use(EnsuredAuthorizedMiddleware);
vehicleRouter.post("/create", new CreateOneVehicleController().handle);
vehicleRouter.get("/one/:id", new FindOneIdVehicleController().handle);
vehicleRouter.get("/allFilter", new FindFilterVehicleController().handle);

vehicleRouter.use(EmployeeIsAdminMiddleware);
vehicleRouter.delete("/delete/:id", new DeleteOneIdVehicleController().handle);

export { vehicleRouter };
