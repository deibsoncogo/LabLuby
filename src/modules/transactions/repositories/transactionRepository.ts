import { getRepository, Repository } from "typeorm";
import { TransactionEntity } from "../entities/transactionEntity";
import { ITransactionRepository } from "./iTransactionRepository";

export class TransactionRepository implements ITransactionRepository {
  private transactionRepository: Repository<TransactionEntity>;

  constructor() { this.transactionRepository = getRepository(TransactionEntity); }

  async teste(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
