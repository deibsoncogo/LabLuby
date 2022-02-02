import { ICreateOneTransactionDto } from "../dtos/iCreateOneTransactionDto";
import { IFindFilterTransactionDto } from "../dtos/iFindFilterTransactionDto";
import { IUpdateOneIdTransactionDto } from "../dtos/iUpdateOneIdTransactionDto";
import { TransactionEntity } from "../entities/transactionEntity";

export interface ITransactionRepository {
  deleteOneIdTransaction(id: string): Promise<void>;
  findOneIdTransaction(id: string): Promise<TransactionEntity>;
  findOneIdVehicleTransaction(idVehicle: string): Promise<TransactionEntity>;

  updateOneIdTransaction(
    { id, type, idEmployee, idVehicle, date, amount }: IUpdateOneIdTransactionDto
  ): Promise<TransactionEntity>;

  findFilterTransaction(
    { type, idEmployee, idVehicle, date, amount }: IFindFilterTransactionDto
  ): Promise<TransactionEntity[]>;

  createOneTransaction(
    { type, idEmployee, idVehicle, date, amount }:ICreateOneTransactionDto
  ): Promise<TransactionEntity>;
}
