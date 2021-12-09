import { ICreateEmployeeDto } from "@employees/dtos/iCreateEmployeeDto";
import { IUpdateEmployeeDto } from "@employees/dtos/iUpdateEmployeeDto";
import { EmployeeEntity } from "@employees/entities/employeeEntity";
import { IToggleEmployeeAdmin } from "@employees/useCases/toggleEmployeeAdmin/toggleEmployeeAdminService";

export interface IEmployeeRepository {
  create({ name, cpf, email, password, avatarUrl }: ICreateEmployeeDto): Promise<EmployeeEntity>;
  findOneCpf(cpf: number): Promise<EmployeeEntity>;
  findOneEmail(email: string): Promise<EmployeeEntity>;
  findOneId(id: string): Promise<EmployeeEntity>;
  list(): Promise<EmployeeEntity[]>;
  update({ id, name, cpf, email, password, avatarUrl }: IUpdateEmployeeDto): Promise<EmployeeEntity>;
  toggleAdmin({ cpf }: IToggleEmployeeAdmin): Promise<EmployeeEntity>;
}
