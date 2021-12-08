import { Router } from "express";
import { CreateEmployeeController } from "@employees/useCases/createEmployee/createEmployeeController";

const employeeRouter = Router();

const createEmployeeController = new CreateEmployeeController();

employeeRouter.post("/", createEmployeeController.handle);

export { employeeRouter };
