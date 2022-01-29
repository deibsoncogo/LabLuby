import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IVehicleRepository } from "../../repositories/iVehicleRepository";

@injectable()
export class DeleteVehicleService {
  constructor(@inject("VehicleRepository") private vehicleRepository: IVehicleRepository) { }

  async execute(id: string): Promise<void> {
    const idExists = await this.vehicleRepository.findOneIdVehicle(id);

    if (!idExists) {
      throw new AppError("Não existe um veículo com este ID!");
    }

    await this.vehicleRepository.deleteIdVehicle(id);
  }
}
