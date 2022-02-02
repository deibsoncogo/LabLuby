import { inject, injectable } from "tsyringe";
import { FormatDate } from "../../../../utils/formatDate";
import { IFindFilterTransactionDto } from "../../dtos/iFindFilterTransactionDto";
import { TransactionEntity } from "../../entities/transactionEntity";
import { ITransactionRepository } from "../../repositories/iTransactionRepository";

@injectable()
export class FindFilterTransactionService {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(
    { type, idEmployee, idVehicle, date, amount }: IFindFilterTransactionDto,
  ): Promise<TransactionEntity[]> {
    const transactionFilter = await this.transactionRepository.findFilterTransaction({
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
