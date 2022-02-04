import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { FormatDate } from "../../../../utils/formatDate";
import { EmployeeEntity } from "../../entities/employeeEntity";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class FindOneIdEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(cpf: number): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOneCpfEmployee(cpf);

    if (!employee) {
      throw new AppError("Não existe um funcionário cadastrado com este CPF");
    }

    employee.createdAt = FormatDate(employee.createdAt);
    employee.updatedAt = FormatDate(employee.updatedAt);
    delete employee.password;

    return employee;
  }
}
