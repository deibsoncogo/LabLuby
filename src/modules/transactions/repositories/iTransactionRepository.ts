import { ICreateTransactionDto } from "../dtos/iCreateTransactionDto";
import { iFindAllFilterTransactionDto } from "../dtos/iFindAllFilterTransactionDto";
import { TransactionEntity } from "../entities/transactionEntity";

export interface ITransactionRepository {
  findOneIdTransaction(id: string): Promise<TransactionEntity>;
  findOneIdVehicleTransaction(idVehicle: string): Promise<TransactionEntity>;

  findAllFilterTransaction(
    { type, idEmployee, idVehicle, date, amount }: iFindAllFilterTransactionDto
  ): Promise<TransactionEntity[]>;

  createTransaction(
    { type, idEmployee, idVehicle, date, amount }:ICreateTransactionDto
  ): Promise<TransactionEntity>;
}
