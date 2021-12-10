import { container } from "tsyringe";
import { EmployeeRepository } from "../modules/employees/repositories/employeeRepository";
import { IEmployeeRepository } from "../modules/employees/repositories/iEmployeeRepository";
import { IVehicleRepository } from "../modules/vehicles/repositories/iVehicleRepository";
import { VehicleRepository } from "../modules/vehicles/repositories/vehicleRepository";

container.registerSingleton<IEmployeeRepository>("EmployeeRepository", EmployeeRepository);
container.registerSingleton<IVehicleRepository>("VehicleRepository", VehicleRepository);
