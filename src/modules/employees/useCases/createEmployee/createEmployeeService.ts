import { hash } from "bcryptjs";
import { AppError } from "errors/appError";
import { inject, injectable } from "tsyringe";
import { ICreateEmployeeDto } from "@employees/dtos/iCreateEmployeeDto";
import { EmployeeEntity } from "@employees/entities/employeeEntity";
import { IEmployeeRepository } from "@employees/repositories/iEmployeeRepository";

@injectable()
export class CreateEmployeeService {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,
  ) { }

  async execute(
    { name, cpf, email, password, avatarUrl }: ICreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const cpfAlreadyExist = await this.employeeRepository.findOneCpf(cpf);

    if (cpfAlreadyExist) {
      throw new AppError("Já existe um funcionário com este CPF!");
    }

    const passwordHash = await hash(password, 8);

    const employee = this.employeeRepository.create({
      name,
      cpf,
      email,
      password: passwordHash,
      avatarUrl,
    });

    return employee;
  }
}
