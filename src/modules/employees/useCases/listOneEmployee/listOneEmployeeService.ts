import { AppError } from "errors/appError";
import { inject, injectable } from "tsyringe";
import { EmployeeEntity } from "@employees/entities/employeeEntity";
import { IEmployeeRepository } from "@employees/repositories/iEmployeeRepository";

@injectable()
export class ListOneEmployeeService {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,
  ) { }

  async execute(id: string): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOneId(id);

    if (!employee) {
      throw new AppError("ID inválido");
    }

    delete employee.password;

    return employee;
  }
}
