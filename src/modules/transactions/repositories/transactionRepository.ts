import { getRepository, Repository } from "typeorm";
import { VehicleEntity } from "../../vehicles/entities/vehicleEntity";
import { ICreateTransactionDto } from "../dtos/iCreateTransactionDto";
import { TransactionEntity } from "../entities/transactionEntity";
import { ITransactionRepository } from "./iTransactionRepository";

export class TransactionRepository implements ITransactionRepository {
  private transactionRepository: Repository<TransactionEntity>;

  private vehicleRepository: Repository<VehicleEntity>;

  constructor() {
    this.transactionRepository = getRepository(TransactionEntity);
    this.vehicleRepository = getRepository(VehicleEntity);
  }

  async findOneIdTransaction(id: string): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findOne({ id });

    return transaction;
  }

  async findOneIdVehicleTransaction(idVehicle: string): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findOne({ idVehicle });

    return transaction;
  }

  async createTransaction(
    { type, idEmployee, idVehicle, date, amount }: ICreateTransactionDto,
  ): Promise<TransactionEntity> {
    const vehicle = await this.vehicleRepository.findOne({ id: idVehicle });

    if (type === "venda") {
      vehicle.status = "vendido";
    } else {
      vehicle.status = "reservado";
    }

    vehicle.updatedAt = new Date();

    await this.vehicleRepository.save(vehicle);

    const transaction = await this.transactionRepository.create({
      type,
      idEmployee,
      idVehicle,
      date,
      amount,
    });

    await this.transactionRepository.save(transaction);

    return transaction;
  }
}
