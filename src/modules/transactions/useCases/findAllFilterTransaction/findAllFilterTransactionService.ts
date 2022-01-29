import { inject, injectable } from "tsyringe";
import { FormatDate } from "../../../../utils/formatDate";
import { iFindAllFilterTransactionDto } from "../../dtos/iFindAllFilterTransactionDto";
import { TransactionEntity } from "../../entities/transactionEntity";
import { ITransactionRepository } from "../../repositories/iTransactionRepository";

@injectable()
export class FindAllFilterTransactionService {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(
    { type, idEmployee, idVehicle, date, amount }: iFindAllFilterTransactionDto,
  ): Promise<TransactionEntity[]> {
    const transactionFilter = await this.transactionRepository.findAllFilterTransaction({
      type,
      idEmployee,
      idVehicle,
      date,
      amount,
    });

    transactionFilter.map((transaction) => {
      transaction.createdAt = FormatDate(transaction.createdAt);
      transaction.updatedAt = FormatDate(transaction.updatedAt);
      transaction.date = FormatDate(transaction.date);

      return transaction;
    });

    return transactionFilter;
  }
}
