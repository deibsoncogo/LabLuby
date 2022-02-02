import { ICreateOneTransactionDto } from "../dtos/iCreateOneTransactionDto";
import { IFindFilterTransactionDto } from "../dtos/iFindFilterTransactionDto";
import { IUpdateOneTransactionDto } from "../dtos/iUpdateOneTransactionDto";
import { TransactionEntity } from "../entities/transactionEntity";

export interface ITransactionRepository {
  toggleTypeOneIdTransaction(id: string): Promise<TransactionEntity>;
  deleteOneIdTransaction(id: string): Promise<void>;
  findOneIdTransaction(id: string): Promise<TransactionEntity>;
  findOneIdVehicleTransaction(idVehicle: string): Promise<TransactionEntity>;

  updateOneTransaction(
    { id, type, idEmployee, idVehicle, date, amount }: IUpdateOneTransactionDto
  ): Promise<TransactionEntity>;

  findFilterTransaction(
    { type, idEmployee, idVehicle, date, amount }: IFindFilterTransactionDto
  ): Promise<TransactionEntity[]>;

  createOneTransaction(
    { type, idEmployee, idVehicle, date, amount }:ICreateOneTransactionDto
  ): Promise<TransactionEntity>;
}
