import { AppError } from "errors/appError";
import { inject, injectable } from "tsyringe";
import { IToggleEmployeeDto } from "@employees/dtos/iToggleEmployeeDto";
import { EmployeeEntity } from "@employees/entities/employeeEntity";
import { IEmployeeRepository } from "@employees/repositories/iEmployeeRepository";

@injectable()
export class ToggleEmployeeService {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,
  ) { }

  async execute({ idAdmin, cpf }: IToggleEmployeeDto): Promise<EmployeeEntity> {
    const employeeAdmin = await this.employeeRepository.findOneId(idAdmin);

    if (!employeeAdmin.isAdmin) {
      throw new AppError("Funcionário não é administrador", 401);
    }

    const employee = await this.employeeRepository.findOneCpf(cpf);

    if (!employee) {
      throw new AppError("CPF do funcionário inválido");
    }

    const status = employee.off;

    employee.off = !status;

    delete employee.password;

    return employee;
  }
}
