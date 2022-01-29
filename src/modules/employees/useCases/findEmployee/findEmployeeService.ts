import { inject, injectable } from "tsyringe";
import { FormatDate } from "../../../../utils/formatDate";
import { EmployeeEntity } from "../../entities/employeeEntity";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class FindEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(): Promise<EmployeeEntity[]> {
    const employeeAll = await this.employeeRepository.findEmployee();

    employeeAll.map(async (employee) => {
      delete employee.password;
      employee.createdAt = FormatDate(employee.createdAt);
      employee.updatedAt = FormatDate(employee.updatedAt);
    });

    return employeeAll;
  }
}
