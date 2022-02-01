import { ICreateEmployeeDto } from "../dtos/iCreateEmployeeDto";
import { IUpdateEmployeeDto } from "../dtos/iUpdateEmployeeDto";
import { EmployeeEntity } from "../entities/employeeEntity";

// interface que servira como contrato do repositório
export interface IEmployeeRepository {
  toggleOffOneCpfEmployee(cpf: number): Promise<EmployeeEntity>;
  toggleAdminOneCpfEmployee(cpf: number): Promise<EmployeeEntity>;
  findOneEmailEmployee(email: string): Promise<EmployeeEntity>;
  findOneCpfEmployee(cpf: number): Promise<EmployeeEntity>;
  findOneIdEmployee(id: string): Promise<EmployeeEntity>;
  findAllEmployee(): Promise<EmployeeEntity[]>;

  updateOneEmployee(
    { id, name, cpf, email, passwordNew, avatarUrl }: IUpdateEmployeeDto
  ): Promise<EmployeeEntity>;

  createOneEmployee(
    { name, cpf, email, password, avatarUrl }: ICreateEmployeeDto
  ): Promise<EmployeeEntity>;
}
