import { getRepository, Repository } from "typeorm";
import { ICreateEmployeeDto } from "@employees/dtos/iCreateEmployeeDto";
import { EmployeeEntity } from "@employees/entities/employeeEntity";
import { IEmployeeRepository } from "@employees/repositories/iEmployeeRepository";

export class EmployeeRepository implements IEmployeeRepository {
  private employeeRepository: Repository<EmployeeEntity>;

  constructor() {
    this.employeeRepository = getRepository(EmployeeEntity);
  }

  async create(
    { name, cpf, email, password, avatarUrl }: ICreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const employee = this.employeeRepository.create({ name, cpf, email, password, avatarUrl });

    await this.employeeRepository.save(employee);

    return employee;
  }

  findOneCpf(cpf: number): Promise<EmployeeEntity> {
    const employee = this.employeeRepository.findOne({ cpf });

    return employee;
  }

  findOneEmail(email: string): Promise<EmployeeEntity> {
    const employee = this.employeeRepository.findOne({ email });

    return employee;
  }

  findOneId(id: string): Promise<EmployeeEntity> {
    const employee = this.employeeRepository.findOne({ id });

    return employee;
  }
}
