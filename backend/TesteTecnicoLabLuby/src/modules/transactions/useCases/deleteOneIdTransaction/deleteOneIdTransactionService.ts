import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { ITransactionRepository } from "../../repositories/iTransactionRepository";

@injectable()
export class DeleteOneIdTransactionService {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existsTransaction = await this.transactionRepository.findOneIdTransaction(id);

    if (!existsTransaction) {
      throw new AppError("ID da transação inválido");
    }

    await this.transactionRepository.deleteOneIdTransaction(id);
  }
}
