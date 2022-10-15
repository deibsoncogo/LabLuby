import { Router } from "express";
import { EmployeeIsAdminMiddleware } from "../middlewares/employeeIsAdminMiddleware";
import { EnsuredAuthorizedMiddleware } from "../middlewares/ensuredAuthorizedMiddleware";
import { CreateAuthenticateOneEmployeeController } from "../modules/employees/useCases/createAuthenticateOneEmployee/createAuthenticateOneEmployeeController";
import { CreateOneEmployeeController } from "../modules/employees/useCases/createOneEmployee/createOneEmployeeController";
import { FindAllEmployeeController } from "../modules/employees/useCases/findAllEmployee/findAllEmployeeController";
import { FindOneIdEmployeeController } from "../modules/employees/useCases/findOneIdEmployee/findOneIdEmployeeController";
import { ToggleAdminOneCpfEmployeeController } from "../modules/employees/useCases/toggleAdminOneCpfEmployee/toggleAdminOneCpfEmployeeController";
import { ToggleOffOneCpfEmployeeController } from "../modules/employees/useCases/toggleOffOneCpfEmployee/toggleOffOneCpfEmployeeController";
import { UpdateOneEmployeeController } from "../modules/employees/useCases/updateOneEmployee/updateOneEmployeeController";

const employeeRouter = Router();

employeeRouter.post("/createOne", new CreateOneEmployeeController().handle);
employeeRouter.post("/createAuthenticateOne", new CreateAuthenticateOneEmployeeController().handle);

employeeRouter.use(EnsuredAuthorizedMiddleware);
employeeRouter.get("/findAll", new FindAllEmployeeController().handle);
employeeRouter.get("/findOne/:cpf", new FindOneIdEmployeeController().handle);

employeeRouter.use(EmployeeIsAdminMiddleware);
employeeRouter.put("/updateOne/:id", new UpdateOneEmployeeController().handle);
employeeRouter.patch("/toggleAdminOne", new ToggleAdminOneCpfEmployeeController().handle);
employeeRouter.patch("/toggleOffOne", new ToggleOffOneCpfEmployeeController().handle);

export { employeeRouter };
