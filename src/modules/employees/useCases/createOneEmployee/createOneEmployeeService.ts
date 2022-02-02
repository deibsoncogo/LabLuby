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
    { name, cpf, email, password, avatarUrl }: ICreateOneEmployeeDto,
  ): Promise<EmployeeEntity> {
    const cpfAlreadyExists = await this.employeeRepository.findOneCpfEmployee(cpf);

    if (cpfAlreadyExists) {
      throw new AppError("Já existe um funcionário com este CPF!");
    }

    const emailAlreadyExists = await this.employeeRepository.findOneEmailEmployee(email);

    if (emailAlreadyExists) {
      throw new AppError("Já existe um funcionário com este email!");
    }

    const avatarUrlAlreadyExists = await this.employeeRepository.findOneAvatarUrlEmployee(avatarUrl);

    if (avatarUrlAlreadyExists) {
      throw new AppError("Já existe um funcionário com está foto!");
    }

    const passwordHash = await hash(password, 8);

    const employeeNew = await this.employeeRepository.createOneEmployee({
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
