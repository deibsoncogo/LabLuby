import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { FormatDate } from "../../../../utils/formatDate";
import { IUpdateEmployeeDto } from "../../dtos/iUpdateEmployeeDto";
import { EmployeeEntity } from "../../entities/employeeEntity";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class UpdateEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(
    { id, name, cpf, email, passwordOld, passwordNew, avatarUrl }: IUpdateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOneIdEmployee(id);

    if (!employee) {
      throw new AppError("ID do funcionário inválido");
    }

    const emailAlreadyExists = await this.employeeRepository.findOneEmailEmployee(email);

    if (emailAlreadyExists) {
      throw new AppError("Já existe este email no sistema");
    }

    const cpfAlreadyExists = await this.employeeRepository.findOneCpfEmployee(cpf);

    if (cpfAlreadyExists) {
      throw new AppError("Já existe este CPF no sistema");
    }

    if (passwordOld && passwordNew) {
      const passwordMatch = await compare(passwordOld, employee.password);

      if (!passwordMatch) {
        throw new AppError("Senha antiga inválida!");
      }

      passwordNew = await hash(passwordNew, 8);
    }

    const employeeNew = await this.employeeRepository.updateOneEmployee({
      id,
      name,
      cpf,
      email,
      passwordNew,
      avatarUrl,
    });

    delete employeeNew.password;
    employeeNew.createdAt = FormatDate(employeeNew.createdAt);
    employeeNew.updatedAt = FormatDate(employeeNew.updatedAt);

    return employeeNew;
  }
}
