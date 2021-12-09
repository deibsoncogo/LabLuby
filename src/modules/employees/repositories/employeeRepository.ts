import { getRepository, Repository } from "typeorm";
import { ICreateEmployeeDto } from "@employees/dtos/iCreateEmployeeDto";
import { EmployeeEntity } from "@employees/entities/employeeEntity";
import { IEmployeeRepository } from "@employees/repositories/iEmployeeRepository";
import { IUpdateEmployeeDto } from "@employees/useCases/updateEmployee/updateEmployeeService";

export class EmployeeRepository implements IEmployeeRepository {
  private employeeRepository: Repository<EmployeeEntity>;

  constructor() {
    this.employeeRepository = getRepository(EmployeeEntity);
  }

  async create(
    { name, cpf, email, password, avatarUrl }: ICreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.create({ name, cpf, email, password, avatarUrl });

    await this.employeeRepository.save(employee);

    return employee;
  }

  async findOneCpf(cpf: number): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({ cpf });

    return employee;
  }

  async findOneEmail(email: string): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({ email });

    return employee;
  }

  async findOneId(id: string): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({ id });

    return employee;
  }

  async list(): Promise<EmployeeEntity[]> {
    const employeeAll = await this.employeeRepository.find();

    return employeeAll;
  }

  async update({ employeeUpdate, idEmployee }: IUpdateEmployeeDto): Promise<EmployeeEntity> {
    const employee = await this.findOneId(idEmployee);

    employee.name = employeeUpdate.name && employeeUpdate.name;
    employee.cpf = employeeUpdate.cpf && employeeUpdate.cpf;
    employee.email = employeeUpdate.email && employeeUpdate.email;
    employee.password = employeeUpdate.password && employeeUpdate.password;
    employee.avatarUrl = employeeUpdate.avatarUrl && employeeUpdate.avatarUrl;
    employee.updatedAt = new Date();

    const employeeNew = await this.employeeRepository.save(employee);

    return employeeNew;
  }
}
