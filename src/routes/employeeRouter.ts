import { Router } from "express";
import { EmployeeIsAdminMiddleware } from "middlewares/employeeIsAdminMiddleware";
import { EnsuredAuthorizedMiddleware } from "middlewares/ensuredAuthorizedMiddleware";
import { AuthenticateEmployeeController } from "@employees/useCases/authenticateEmployee/authenticateEmployeeController";
import { CreateEmployeeController } from "@employees/useCases/createEmployee/createEmployeeController";
import { ListEmployeeController } from "@employees/useCases/listEmployee/listEmployeeController";
import { ListOneEmployeeController } from "@employees/useCases/listOneEmployee/listOneEmployeeController";
import { ToggleEmployeeController } from "@employees/useCases/toggleEmployee/toggleEmployeeController";
import { ToggleEmployeeAdminController } from "@employees/useCases/toggleEmployeeAdmin/toggleEmployeeAdminController";
import { UpdateEmployeeController } from "@employees/useCases/updateEmployee/updateEmployeeController";

const employeeRouter = Router();

const toggleEmployeeController = new ToggleEmployeeController();
const toggleEmployeeAdminController = new ToggleEmployeeAdminController();

employeeRouter.post("/create", new CreateEmployeeController().handle);
employeeRouter.post("/authenticate", new AuthenticateEmployeeController().handle);

employeeRouter.use(EnsuredAuthorizedMiddleware);
employeeRouter.get("/one/:cpf", new ListOneEmployeeController().handle);
employeeRouter.patch("/toggle", toggleEmployeeController.handle);
employeeRouter.patch("/toggleAdmin", toggleEmployeeAdminController.handle);

employeeRouter.use(EmployeeIsAdminMiddleware);
employeeRouter.get("/all", new ListEmployeeController().handle);
employeeRouter.put("/:id", new UpdateEmployeeController().handle);

export { employeeRouter };
