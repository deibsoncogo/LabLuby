import { ICreateTransactionDto } from "../dtos/iCreateTransactionDto";
import { iFindAllFilterTransactionDto } from "../dtos/iFindAllFilterTransactionDto";
import { IUpdateOneIdTransactionDto } from "../dtos/iUpdateOneIdTransactionDto";
import { TransactionEntity } from "../entities/transactionEntity";

export interface ITransactionRepository {
  deleteOneIdTransaction(id: string): Promise<void>;
  findOneIdTransaction(id: string): Promise<TransactionEntity>;
  findOneIdVehicleTransaction(idVehicle: string): Promise<TransactionEntity>;

  updateOneIdTransaction(
    { id, type, idEmployee, idVehicle, date, amount }: IUpdateOneIdTransactionDto
  ): Promise<TransactionEntity>;

  findAllFilterTransaction(
    { type, idEmployee, idVehicle, date, amount }: iFindAllFilterTransactionDto
  ): Promise<TransactionEntity[]>;

  createTransaction(
    { type, idEmployee, idVehicle, date, amount }:ICreateTransactionDto
  ): Promise<TransactionEntity>;
}
