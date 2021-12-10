import { AppError } from "errors/appError";
import { inject, injectable } from "tsyringe";
import { EmployeeEntity } from "../../entities/employeeEntity";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class ListOneEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(cpf: number): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOneCpf(cpf);

    if (!employee) {
      throw new AppError("CPF inválido");
    }

    delete employee.password;

    return employee;
  }
}
