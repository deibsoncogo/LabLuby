import { getRepository, Repository } from "typeorm";
import { ICreateOneEmployeeDto } from "../dtos/iCreateOneEmployeeDto";
import { IUpdateOneEmployeeDto } from "../dtos/iUpdateOneEmployeeDto";
import { EmployeeEntity } from "../entities/employeeEntity";
import { IEmployeeRepository } from "./iEmployeeRepository";

// classe que servira como repositório de funcionário
export class EmployeeRepository implements IEmployeeRepository {
  // cria a variável que servira como conexão ao banco de dados
  private employeeRepository: Repository<EmployeeEntity>;

  // cria a conexão com o banco de dados
  constructor() { this.employeeRepository = getRepository(EmployeeEntity); }

  // função que vai alterar o desligamento do funcionário
  async toggleOffOneCpfEmployee(cpf: number): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({ cpf });

    employee.isAdmin = false;
    employee.off = !employee.off;

    const employeeSave = await this.employeeRepository.save(employee);

    return employeeSave;
  }

  // função que vai alterar se o funcionário é administrador
  async toggleAdminOneCpfEmployee(cpf: number): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({ cpf });

    employee.isAdmin = !employee.isAdmin;

    const employeeSave = await this.employeeRepository.save(employee);

    return employeeSave;
  }

  // função que vai buscar um funcionário pelo e-mail
  async findOneEmailEmployee(email: string): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({ email });

    return employee;
  }

  // função que vai buscar um funcionário pelo cpf
  async findOneCpfEmployee(cpf: number): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({ cpf });

    return employee;
  }

  // função que vai buscar um funcionário pelo ID
  async findOneIdEmployee(id: string): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({ id });

    return employee;
  }

  // função que vai buscar todos os funcionários
  async findAllEmployee(): Promise<EmployeeEntity[]> {
    const employeeAll = await this.employeeRepository.find(
      { order: { createdAt: "ASC" } },
    );

    return employeeAll;
  }

  // função que vai alterar os dados de um funcionário
  async updateOneEmployee(
    { id, name, cpf, email, passwordNew, avatarUrl }: IUpdateOneEmployeeDto,
  ): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({ id });

    employee.name = name || employee.name;
    employee.cpf = cpf || employee.cpf;
    employee.email = email || employee.email;
    employee.password = passwordNew || employee.password;
    employee.avatarUrl = avatarUrl || employee.avatarUrl;
    employee.updatedAt = new Date();

    const employeeSave = await this.employeeRepository.save(employee);

    return employeeSave;
  }

  // função que vai criar um funcionário
  async createOneEmployee(
    { name, cpf, email, password, avatarUrl }: ICreateOneEmployeeDto,
  ): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.create({
      name,
      cpf,
      email,
      password,
      avatarUrl,
    });

    const employeeSave = await this.employeeRepository.save(employee);

    return employeeSave;
  }
}
