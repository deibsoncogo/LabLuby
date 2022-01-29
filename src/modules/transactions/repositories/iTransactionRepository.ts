import { ICreateTransactionDto } from "../dtos/iCreateTransactionDto";
import { TransactionEntity } from "../entities/transactionEntity";

export interface ITransactionRepository {
  findOneIdTransaction(id: string): Promise<TransactionEntity>;
  findOneIdVehicleTransaction(idVehicle: string): Promise<TransactionEntity>;

  createTransaction(
    { type, idEmployee, idVehicle, date, amount }:ICreateTransactionDto
  ): Promise<TransactionEntity>;
}
