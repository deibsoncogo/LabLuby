import { ICreateEmployeeDto } from "@employees/dtos/iCreateEmployeeDto";
import { EmployeeEntity } from "@employees/entities/employeeEntity";
import { IUpdateEmployeeDto } from "@employees/useCases/updateEmployee/updateEmployeeService";

export interface IEmployeeRepository {
  create({ name, cpf, email, password, avatarUrl }: ICreateEmployeeDto): Promise<EmployeeEntity>;
  findOneCpf(cpf: number): Promise<EmployeeEntity>;
  findOneEmail(email: string): Promise<EmployeeEntity>;
  findOneId(id: string): Promise<EmployeeEntity>;
  list(): Promise<EmployeeEntity[]>;
  update({ employeeUpdate, idEmployee }: IUpdateEmployeeDto): Promise<EmployeeEntity>;
}
