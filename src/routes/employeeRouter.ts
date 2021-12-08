import { Router } from "express";
import { AuthenticateEmployeeController } from "@employees/useCases/authenticateEmployee/authenticateEmployeeController";
import { CreateEmployeeController } from "@employees/useCases/createEmployee/createEmployeeController";

const employeeRouter = Router();

const createEmployeeController = new CreateEmployeeController();
const authenticateEmployeeController = new AuthenticateEmployeeController();

employeeRouter.post("/", createEmployeeController.handle);
employeeRouter.post("/authenticate", authenticateEmployeeController.handle);

export { employeeRouter };
