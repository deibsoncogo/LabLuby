import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IEmployeeRepository } from "../../../employees/repositories/iEmployeeRepository";
import { TransactionEntity } from "../../entities/transactionEntity";
import { ITransactionRepository } from "../../repositories/iTransactionRepository";

@injectable()
export class ToggleTypeOneIdTransactionService {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,

    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute(id: string): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findOneIdTransaction(id);

    if (!transaction) {
      throw new AppError("Não existe uma transação com este ID");
    }

    const employee = await this.employeeRepository.findOneIdEmployee(transaction.idEmployee);

    if (employee) {
      if (employee.off) {
        throw new AppError("Este funcionário está desligado");
      }
    }

    const transactionRepository = await this.transactionRepository.toggleTypeOneIdTransaction(id);

    return transactionRepository;
  }
}
