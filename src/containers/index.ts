import { container } from "tsyringe";
import { EmployeeRepository } from "@employees/repositories/employeeRepository";
import { IEmployeeRepository } from "@employees/repositories/iEmployeeRepository";

container.registerSingleton<IEmployeeRepository>("EmployeeRepository", EmployeeRepository);
