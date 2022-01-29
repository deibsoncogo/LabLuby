import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { FormatDate } from "../../../../utils/formatDate";
import { TransactionEntity } from "../../entities/transactionEntity";
import { ITransactionRepository } from "../../repositories/iTransactionRepository";

@injectable()
export class FindOneIdTransactionService {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(id: string): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findOneIdTransaction(id);

    if (!transaction) {
      throw new AppError("ID da transação inválido");
    }

    transaction.createdAt = FormatDate(transaction.createdAt);
    transaction.updatedAt = FormatDate(transaction.updatedAt);
    transaction.date = FormatDate(transaction.date);
    transaction.employee.createdAt = FormatDate(transaction.employee.createdAt);
    transaction.employee.updatedAt = FormatDate(transaction.employee.updatedAt);
    transaction.vehicle.createdAt = FormatDate(transaction.vehicle.createdAt);
    transaction.vehicle.updatedAt = FormatDate(transaction.vehicle.updatedAt);
    delete transaction.employee.password;

    return transaction;
  }
}
