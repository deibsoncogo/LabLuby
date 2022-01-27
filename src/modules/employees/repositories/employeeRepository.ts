import { getRepository, Repository } from "typeorm";
import { ICreateEmployeeDto } from "../dtos/iCreateEmployeeDto";
import { IUpdateEmployeeDto } from "../dtos/iUpdateEmployeeDto";
import { EmployeeEntity } from "../entities/employeeEntity";
import { IEmployeeRepository } from "./iEmployeeRepository";

export class EmployeeRepository implements IEmployeeRepository {
  private employeeRepository: Repository<EmployeeEntity>;

  constructor() { this.employeeRepository = getRepository(EmployeeEntity); }

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
    const employeeAll = await this.employeeRepository.find({ order: { createdAt: "ASC" } });

    return employeeAll;
  }

  async toggleAdmin(cpf: number): Promise<boolean> {
    const employee = await this.findOneCpf(cpf);

    employee.isAdmin = !employee.isAdmin;

    const { isAdmin } = await this.employeeRepository.save(employee);

    return isAdmin;
  }

  async toggleOff(cpf: number): Promise<EmployeeEntity> {
    const employee = await this.findOneCpf(cpf);

    employee.isAdmin = false;
    employee.off = !employee.off;

    const employeeSave = await this.employeeRepository.save(employee);

    return employeeSave;
  }

  async update(
    { id, name, cpf, email, passwordNew, avatarUrl }: IUpdateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const employee = await this.findOneId(id);

    employee.name = name || employee.name;
    employee.cpf = cpf || employee.cpf;
    employee.email = email || employee.email;
    employee.password = passwordNew || employee.password;
    employee.avatarUrl = avatarUrl || employee.avatarUrl;
    employee.updatedAt = new Date();

    const employeeNew = await this.employeeRepository.save(employee);

    return employeeNew;
  }
}
