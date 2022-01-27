import { Router } from "express";
import { EmployeeIsAdminMiddleware } from "../middlewares/employeeIsAdminMiddleware";
import { EnsuredAuthorizedMiddleware } from "../middlewares/ensuredAuthorizedMiddleware";
import { AuthenticateEmployeeController } from "../modules/employees/useCases/authenticateEmployee/authenticateEmployeeController";
import { CreateEmployeeController } from "../modules/employees/useCases/createEmployee/createEmployeeController";
import { FindEmployeeController } from "../modules/employees/useCases/findEmployee/findEmployeeController";
import { FindOneEmployeeController } from "../modules/employees/useCases/findOneEmployee/findOneEmployeeController";
import { ToggleEmployeeAdminController } from "../modules/employees/useCases/toggleEmployeeAdmin/toggleEmployeeAdminController";
import { ToggleEmployeeOffController } from "../modules/employees/useCases/toggleEmployeeOff/toggleEmployeeOffController";
import { UpdateEmployeeController } from "../modules/employees/useCases/updateEmployee/updateEmployeeController";

const employeeRouter = Router();

employeeRouter.post("/create", new CreateEmployeeController().handle);
employeeRouter.post("/authenticate", new AuthenticateEmployeeController().handle);

employeeRouter.use(EnsuredAuthorizedMiddleware);
employeeRouter.get("/one/:cpf", new FindOneEmployeeController().handle);
employeeRouter.get("/all", new FindEmployeeController().handle);

employeeRouter.use(EmployeeIsAdminMiddleware);
employeeRouter.put("/:id", new UpdateEmployeeController().handle);
employeeRouter.patch("/toggleOff", new ToggleEmployeeOffController().handle);
employeeRouter.patch("/toggleAdmin", new ToggleEmployeeAdminController().handle);

export { employeeRouter };
