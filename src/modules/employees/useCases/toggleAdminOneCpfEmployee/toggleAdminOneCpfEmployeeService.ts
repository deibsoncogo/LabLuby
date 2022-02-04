import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { FormatDate } from "../../../../utils/formatDate";
import { EmployeeEntity } from "../../entities/employeeEntity";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class ToggleAdminOneCpfEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(cpf: number): Promise<EmployeeEntity> {
    const cpfAlreadyExists = await this.employeeRepository.findOneCpfEmployee(cpf);

    if (!cpfAlreadyExists) {
      throw new AppError("Não existe um funcionário cadastrado com este CPF");
    }

    if (cpfAlreadyExists.isOff) {
      throw new AppError("Este funcionário está desligado", 401);
    }

    const employeeSave = await this.employeeRepository.toggleAdminOneCpfEmployee(cpf);

    employeeSave.createdAt = FormatDate(employeeSave.createdAt);
    employeeSave.updatedAt = FormatDate(employeeSave.updatedAt);
    delete employeeSave.password;

    return employeeSave;
  }
}
