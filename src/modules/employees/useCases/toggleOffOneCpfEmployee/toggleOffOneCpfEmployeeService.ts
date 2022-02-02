import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { FormatDate } from "../../../../utils/formatDate";
import { ITransactionRepository } from "../../../transactions/repositories/iTransactionRepository";
import { EmployeeEntity } from "../../entities/employeeEntity";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

@injectable()
export class ToggleOffOneCpfEmployeeService {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,

    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,
  ) { }

  async execute(cpf: number): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOneCpfEmployee(cpf);

    if (!employee) {
      throw new AppError("Não existe um funcionário com este CPF");
    }

    const transaction = await this.transactionRepository
      .findOneIdEmployeeTransaction(employee.id);

    if (transaction !== undefined) {
      if (transaction.type === "reserva") {
        throw new AppError("Existe uma transação reservada deste funcionário");
      }
    }

    const employeeSave = await this.employeeRepository.toggleOffOneCpfEmployee(cpf);

    employeeSave.createdAt = FormatDate(employeeSave.createdAt);
    employeeSave.updatedAt = FormatDate(employeeSave.updatedAt);
    delete employeeSave.password;

    return employeeSave;
  }
}
