import { AppError } from "errors/appError";
import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class ToggleEmployeeAdminService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(cpf: number): Promise<boolean> {
    const cpfAlreadyExists = await this.employeeRepository.findOneCpf(cpf);

    if (!cpfAlreadyExists) {
      throw new AppError("Não existe este CPF cadastrado");
    }

    if (cpfAlreadyExists.off) {
      throw new AppError("Este funcionário está desligado", 401);
    }

    const statusAdmin = await this.employeeRepository.toggleAdmin(cpf);

    return statusAdmin;
  }
}
