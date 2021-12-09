import { AppError } from "errors/appError";
import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "@employees/repositories/iEmployeeRepository";

@injectable()
export class ToggleEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(cpf: number): Promise<boolean> {
    const employee = await this.employeeRepository.findOneCpf(cpf);

    if (!employee) {
      throw new AppError("CPF do funcionário inválido");
    }

    const off = this.employeeRepository.toggleOff(cpf);

    return off;
  }
}
