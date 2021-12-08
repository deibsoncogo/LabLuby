import { Router } from "express";
import { EnsuredAuthorizedUserMiddleware } from "middlewares/ensuredAuthorizedUserMiddleware";
import { AuthenticateEmployeeController } from "@employees/useCases/authenticateEmployee/authenticateEmployeeController";
import { CreateEmployeeController } from "@employees/useCases/createEmployee/createEmployeeController";
import { ListEmployeeController } from "@employees/useCases/listEmployee/listEmployeeController";
import { ListOneEmployeeController } from "@employees/useCases/listOneEmployee/listOneEmployeeController";
import { ToggleEmployeeController } from "@employees/useCases/toggleEmployee/toggleEmployeeController";

const employeeRouter = Router();

const createEmployeeController = new CreateEmployeeController();
const authenticateEmployeeController = new AuthenticateEmployeeController();
const listOneEmployeeController = new ListOneEmployeeController();
const listEmployeeController = new ListEmployeeController();
const toggleEmployeeController = new ToggleEmployeeController();

employeeRouter.post("/create", createEmployeeController.handle);
employeeRouter.post("/authenticate", authenticateEmployeeController.handle);

employeeRouter.use(EnsuredAuthorizedUserMiddleware);
employeeRouter.get("/one/:id", listOneEmployeeController.handle);
employeeRouter.get("/all", listEmployeeController.handle);
employeeRouter.patch("/toggle", toggleEmployeeController.handle);

export { employeeRouter };
