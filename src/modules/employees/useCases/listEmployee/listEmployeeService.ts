import { inject, injectable } from "tsyringe";
import { EmployeeEntity } from "../../entities/employeeEntity";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class ListEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(): Promise<EmployeeEntity[]> {
    const employeeAll = await this.employeeRepository.list();

    employeeAll.map(async (employee) => {
      delete employee.password;
    });

    return employeeAll;
  }
}
