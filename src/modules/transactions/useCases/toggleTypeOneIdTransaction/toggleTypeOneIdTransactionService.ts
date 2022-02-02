import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { TransactionEntity } from "../../entities/transactionEntity";
import { ITransactionRepository } from "../../repositories/iTransactionRepository";

@injectable()
export class ToggleTypeOneIdTransactionService {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(id: string): Promise<TransactionEntity> {
    const idExists = await this.transactionRepository.findOneIdTransaction(id);

    if (!idExists) {
      throw new AppError("Não existe uma transação com este ID");
    }

    const transaction = await this.transactionRepository.toggleTypeOneIdTransaction(id);

    return transaction;
  }
}
