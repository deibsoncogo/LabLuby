import { hash } from "bcryptjs";
import { AppError } from "errors/appError";
import { inject, injectable } from "tsyringe";
import { EmployeeEntity } from "@employees/entities/employeeEntity";
import { IEmployeeRepository } from "@employees/repositories/iEmployeeRepository";

interface IEmployeeUpdate {
  name?: string;
  cpf?: number;
  email?: string;
  password?: string;
  avatarUrl?: string;
}

export interface IUpdateEmployeeDto {
  employeeUpdate: IEmployeeUpdate;
  idEmployee: string;
}

@injectable()
export class UpdateEmployeeService {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,
  ) { }

  async execute({ employeeUpdate, idEmployee }: IUpdateEmployeeDto): Promise<EmployeeEntity> {
    if (!employeeUpdate) {
      throw new AppError("Não existe alteração para realizar", 200);
    }

    const employee = await this.employeeRepository.findOneId(idEmployee);

    if (!employee) {
      throw new AppError("ID do funcionário inválido");
    }

    const emailAlreadyExists = await this.employeeRepository.findOneEmail(employeeUpdate.email);

    if (emailAlreadyExists) {
      throw new AppError("Já existe este email no sistema");
    }

    const cpfAlreadyExists = await this.employeeRepository.findOneCpf(employeeUpdate.cpf);

    if (cpfAlreadyExists) {
      throw new AppError("Já existe este CPF no sistema");
    }

    const passwordHash = await hash(employeeUpdate.password, 8);
    employeeUpdate.password = passwordHash;

    const employeeNew = await this.employeeRepository.update({ employeeUpdate, idEmployee });

    return employeeNew;
  }
}
