import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { ITransactionRepository } from "../../../transactions/repositories/iTransactionRepository";
import { IVehicleRepository } from "../../repositories/iVehicleRepository";

@injectable()
export class DeleteVehicleService {
  constructor(
    @inject("VehicleRepository")
    private vehicleRepository: IVehicleRepository,

    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,
  ) { }

  async execute(id: string): Promise<void> {
    const idExists = await this.vehicleRepository.findOneIdVehicle(id);

    if (!idExists) {
      throw new AppError("Não existe um veículo com este ID");
    }

    const transactionExists = await this.transactionRepository.findOneIdVehicleTransaction(id);

    if (transactionExists) {
      throw new AppError("Existe uma transação para este veículo");
    }

    await this.vehicleRepository.deleteOneIdVehicle(id);
  }
}
