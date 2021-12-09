import { AppError } from "errors/appError";
import { inject, injectable } from "tsyringe";
import { EmployeeEntity } from "@employees/entities/employeeEntity";
import { IEmployeeRepository } from "@employees/repositories/iEmployeeRepository";

export interface IToggleEmployeeAdmin {
  cpf: number;
}

@injectable()
export class ToggleEmployeeAdminService {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,
  ) { }

  async execute({ cpf }: IToggleEmployeeAdmin): Promise<EmployeeEntity> {
    const cpfAlreadyExists = await this.employeeRepository.findOneCpf(cpf);

    if (!cpfAlreadyExists) {
      throw new AppError("Não existe este CPF cadastrado");
    }

    const employee = await this.employeeRepository.toggleAdmin({ cpf });

    return employee;
  }
}
