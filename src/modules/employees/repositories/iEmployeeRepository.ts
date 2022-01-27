import { ICreateEmployeeDto } from "../dtos/iCreateEmployeeDto";
import { IUpdateEmployeeDto } from "../dtos/iUpdateEmployeeDto";
import { EmployeeEntity } from "../entities/employeeEntity";

// interface que servira como contrato do repositório
export interface IEmployeeRepository {
  toggleOffEmployee(cpf: number): Promise<EmployeeEntity>;
  toggleAdminEmployee(cpf: number): Promise<EmployeeEntity>;
  findOneEmailEmployee(email: string): Promise<EmployeeEntity>;
  findOneCpfEmployee(cpf: number): Promise<EmployeeEntity>;
  findOneIdEmployee(id: string): Promise<EmployeeEntity>;
  findEmployee(): Promise<EmployeeEntity[]>;

  updateEmployee(
    { id, name, cpf, email, passwordNew, avatarUrl }: IUpdateEmployeeDto
  ): Promise<EmployeeEntity>;

  createEmployee(
    { name, cpf, email, password, avatarUrl }: ICreateEmployeeDto
  ): Promise<EmployeeEntity>;
}
