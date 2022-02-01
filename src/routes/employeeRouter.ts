import { Router } from "express";
import { EmployeeIsAdminMiddleware } from "../middlewares/employeeIsAdminMiddleware";
import { EnsuredAuthorizedMiddleware } from "../middlewares/ensuredAuthorizedMiddleware";
import { CreateAuthenticateOneEmployeeController } from "../modules/employees/useCases/createAuthenticateOneEmployee/createAuthenticateOneEmployeeController";
import { CreateOneEmployeeController } from "../modules/employees/useCases/createOneEmployee/createOneEmployeeController";
import { FindAllEmployeeController } from "../modules/employees/useCases/findAllEmployee/findAllEmployeeController";
import { FindOneEmployeeController } from "../modules/employees/useCases/findOneEmployee/findOneEmployeeController";
import { ToggleAdminOneCpfEmployeeController } from "../modules/employees/useCases/toggleAdminOneCpfEmployee/toggleAdminOneCpfEmployeeController";
import { ToggleOffOneCpfEmployeeController } from "../modules/employees/useCases/toggleOffOneCpfEmployee/toggleOffOneCpfEmployeeController";
import { UpdateOneEmployeeController } from "../modules/employees/useCases/updateOneEmployee/updateOneEmployeeController";

const employeeRouter = Router();

employeeRouter.post("/create", new CreateOneEmployeeController().handle);
employeeRouter.post("/authenticate", new CreateAuthenticateOneEmployeeController().handle);

employeeRouter.use(EnsuredAuthorizedMiddleware);
employeeRouter.get("/one/:cpf", new FindOneEmployeeController().handle);
employeeRouter.get("/all", new FindAllEmployeeController().handle);

employeeRouter.use(EmployeeIsAdminMiddleware);
employeeRouter.put("/:id", new UpdateOneEmployeeController().handle);
employeeRouter.patch("/toggleOff", new ToggleOffOneCpfEmployeeController().handle);
employeeRouter.patch("/toggleAdmin", new ToggleAdminOneCpfEmployeeController().handle);

export { employeeRouter };
