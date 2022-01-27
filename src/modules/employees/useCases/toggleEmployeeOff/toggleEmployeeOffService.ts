import { AppError } from "errors/appError";
import { EmployeeEntity } from "modules/employees/entities/employeeEntity";
import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class ToggleEmployeeOffService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(cpf: number): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOneCpfEmployee(cpf);

    if (!employee) {
      throw new AppError("CPF do funcionário inválido");
    }

    const employeeSave = await this.employeeRepository.toggleOffEmployee(cpf);

    delete employeeSave.password;

    return employeeSave;
  }
}
