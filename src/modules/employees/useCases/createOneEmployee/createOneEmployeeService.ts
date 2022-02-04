import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { FormatDate } from "../../../../utils/formatDate";
import { ICreateOneEmployeeDto } from "../../dtos/iCreateOneEmployeeDto";
import { EmployeeEntity } from "../../entities/employeeEntity";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class CreateOneEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(
    { name, cpf, email, password }: ICreateOneEmployeeDto,
  ): Promise<EmployeeEntity> {
    const cpfAlreadyExists = await this.employeeRepository.findOneCpfEmployee(cpf);

    if (cpfAlreadyExists) {
      throw new AppError("Já existe um funcionário com este CPF");
    }

    const emailAlreadyExists = await this.employeeRepository.findOneEmailEmployee(email);

    if (emailAlreadyExists) {
      throw new AppError("Já existe um funcionário com este e-mail");
    }

    const passwordHash = await hash(password, 8);

    const employee = await this.employeeRepository.createOneEmployee({
      name,
      cpf,
      email,
      password: passwordHash,
    });

    employee.createdAt = FormatDate(employee.createdAt);
    employee.updatedAt = FormatDate(employee.updatedAt);
    delete employee.password;

    return employee;
  }
}
