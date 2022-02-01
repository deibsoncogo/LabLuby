import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { FormatDate } from "../../../../utils/formatDate";
import { EmployeeEntity } from "../../entities/employeeEntity";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class ToggleOffOneCpfEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(cpf: number): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOneCpfEmployee(cpf);

    if (!employee) {
      throw new AppError("CPF do funcionário inválido");
    }

    const employeeSave = await this.employeeRepository.toggleOffOneCpfEmployee(cpf);

    employeeSave.createdAt = FormatDate(employeeSave.createdAt);
    employeeSave.updatedAt = FormatDate(employeeSave.updatedAt);
    delete employeeSave.password;

    return employeeSave;
  }
}
