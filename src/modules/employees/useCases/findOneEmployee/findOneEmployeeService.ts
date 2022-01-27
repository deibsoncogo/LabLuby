import { AppError } from "errors/appError";
import { inject, injectable } from "tsyringe";
import { FormatDate } from "utils/formatDate";
import { EmployeeEntity } from "../../entities/employeeEntity";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class FindOneEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(cpf: number): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOneCpfEmployee(cpf);

    if (!employee) {
      throw new AppError("CPF inválido");
    }

    delete employee.password;
    employee.createdAt = FormatDate(employee.createdAt);
    employee.updatedAt = FormatDate(employee.updatedAt);

    return employee;
  }
}
