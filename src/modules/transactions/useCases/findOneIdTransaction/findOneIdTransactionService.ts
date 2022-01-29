import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
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

    return transaction;
  }
}
