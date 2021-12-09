import { AppError } from "errors/appError";
import { inject, injectable } from "tsyringe";
import { EmployeeEntity } from "@employees/entities/employeeEntity";
import { IEmployeeRepository } from "@employees/repositories/iEmployeeRepository";

@injectable()
export class ListEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(employeeIsAdmin: boolean): Promise<EmployeeEntity[]> {
    if (!employeeIsAdmin) {
      throw new AppError("Funcionário não é administrador", 401);
    }

    const employeeAll = await this.employeeRepository.list();

    employeeAll.map(async (employee) => {
      delete employee.password;
    });

    return employeeAll;
  }
}
