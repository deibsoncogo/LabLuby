import { inject, injectable } from "tsyringe";
import { FormatDate } from "../../../../utils/formatDate";
import { EmployeeEntity } from "../../entities/employeeEntity";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class FindAllEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute(): Promise<EmployeeEntity[]> {
    const employeeAll = await this.employeeRepository.findAllEmployee();

    employeeAll.map(async (employee) => {
      employee.createdAt = FormatDate(employee.createdAt);
      employee.updatedAt = FormatDate(employee.updatedAt);
      delete employee.password;
    });

    return employeeAll;
  }
}
