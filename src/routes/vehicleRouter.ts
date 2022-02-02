import { Router } from "express";
import { EmployeeIsAdminMiddleware } from "../middlewares/employeeIsAdminMiddleware";
import { EnsuredAuthorizedMiddleware } from "../middlewares/ensuredAuthorizedMiddleware";
import { CreateOneVehicleController } from "../modules/vehicles/useCases/createOneVehicle/createOneVehicleController";
import { DeleteOneIdVehicleController } from "../modules/vehicles/useCases/deleteOneIdVehicle/deleteOneIdVehicleController";
import { FindFilterVehicleController } from "../modules/vehicles/useCases/findFilterVehicle/findFilterVehicleController";
import { FindOneIdVehicleController } from "../modules/vehicles/useCases/findOneIdVehicle/findOneIdVehicleController";
import { UpdateOneVehicleController } from "../modules/vehicles/useCases/updateOneVehicle/updateOneVehicleController";

const vehicleRouter = Router();

vehicleRouter.use(EnsuredAuthorizedMiddleware);
vehicleRouter.post("/createOne", new CreateOneVehicleController().handle);
vehicleRouter.get("/findFilter", new FindFilterVehicleController().handle);
vehicleRouter.get("/findOne/:id", new FindOneIdVehicleController().handle);

vehicleRouter.use(EmployeeIsAdminMiddleware);
vehicleRouter.put("/updateOne/:id", new UpdateOneVehicleController().handle);
vehicleRouter.delete("/deleteOne/:id", new DeleteOneIdVehicleController().handle);

export { vehicleRouter };
