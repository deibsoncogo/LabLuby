import { ICreateOneEmployeeDto } from "../dtos/iCreateOneEmployeeDto";
import { IUpdateOneEmployeeDto } from "../dtos/iUpdateOneEmployeeDto";
import { EmployeeEntity } from "../entities/employeeEntity";

// interface que servira como contrato do repositório
export interface IEmployeeRepository {
  findOneAvatarUrlEmployee(avatarUrl: string): Promise<EmployeeEntity>;
  toggleOffOneCpfEmployee(cpf: number): Promise<EmployeeEntity>;
  toggleAdminOneCpfEmployee(cpf: number): Promise<EmployeeEntity>;
  findOneEmailEmployee(email: string): Promise<EmployeeEntity>;
  findOneCpfEmployee(cpf: number): Promise<EmployeeEntity>;
  findOneIdEmployee(id: string): Promise<EmployeeEntity>;
  findAllEmployee(): Promise<EmployeeEntity[]>;

  updateOneEmployee(
    { id, name, cpf, email, passwordNew, avatarUrl }: IUpdateOneEmployeeDto
  ): Promise<EmployeeEntity>;

  createOneEmployee(
    { name, cpf, email, password, avatarUrl }: ICreateOneEmployeeDto
  ): Promise<EmployeeEntity>;
}
