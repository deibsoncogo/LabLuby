import { hash } from "bcryptjs";
import { AppError } from "errors/appError";
import { inject, injectable } from "tsyringe";
import { FormatDate } from "utils/formatDate";
import { ICreateEmployeeDto } from "../../dtos/iCreateEmployeeDto";
import { EmployeeEntity } from "../../entities/employeeEntity";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class CreateEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(
    { name, cpf, email, password, avatarUrl }: ICreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const cpfAlreadyExists = await this.employeeRepository.findOneCpf(cpf);

    if (cpfAlreadyExists) {
      throw new AppError("Já existe um funcionário com este CPF!");
    }

    const emailAlreadyExists = await this.employeeRepository.findOneEmail(email);

    if (emailAlreadyExists) {
      throw new AppError("Já existe um funcionário com este email!");
    }

    const passwordHash = await hash(password, 8);

    const employeeNew = await this.employeeRepository.create({
      name,
      cpf,
      email,
      password: passwordHash,
      avatarUrl,
    });

    delete employeeNew.password;
    employeeNew.createdAt = FormatDate(employeeNew.createdAt);
    employeeNew.updatedAt = FormatDate(employeeNew.updatedAt);

    return employeeNew;
  }
}
