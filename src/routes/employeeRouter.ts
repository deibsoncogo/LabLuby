import { Router } from "express";
import { EmployeeIsAdminMiddleware } from "../middlewares/employeeIsAdminMiddleware";
import { EnsuredAuthorizedMiddleware } from "../middlewares/ensuredAuthorizedMiddleware";
import { AuthenticateEmployeeController } from "../modules/employees/useCases/authenticateEmployee/authenticateEmployeeController";
import { CreateEmployeeController } from "../modules/employees/useCases/createEmployee/createEmployeeController";
import { ListEmployeeController } from "../modules/employees/useCases/listEmployee/listEmployeeController";
import { ListOneEmployeeController } from "../modules/employees/useCases/listOneEmployee/listOneEmployeeController";
import { ToggleEmployeeController } from "../modules/employees/useCases/toggleEmployee/toggleEmployeeController";
import { ToggleEmployeeAdminController } from "../modules/employees/useCases/toggleEmployeeAdmin/toggleEmployeeAdminController";
import { UpdateEmployeeController } from "../modules/employees/useCases/updateEmployee/updateEmployeeController";

const employeeRouter = Router();

employeeRouter.post("/create", new CreateEmployeeController().handle);
employeeRouter.post("/authenticate", new AuthenticateEmployeeController().handle);

employeeRouter.use(EnsuredAuthorizedMiddleware);
employeeRouter.get("/one/:cpf", new ListOneEmployeeController().handle);
employeeRouter.get("/all", new ListEmployeeController().handle);

employeeRouter.use(EmployeeIsAdminMiddleware);
employeeRouter.put("/:id", new UpdateEmployeeController().handle);
employeeRouter.patch("/toggle", new ToggleEmployeeController().handle);
employeeRouter.patch("/toggleAdmin", new ToggleEmployeeAdminController().handle);

export { employeeRouter };
