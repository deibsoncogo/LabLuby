import { AppError } from "errors/appError";
import { VehicleEntity } from "modules/vehicles/entities/vehicleEntity";
import { IVehicleRepository } from "modules/vehicles/repositories/iVehicleRepository";
import { inject, injectable } from "tsyringe";
import { FormatDate } from "utils/formatDate";

@injectable()
export class FindOneVehicleService {
  constructor(@inject("VehicleRepository") private vehicleRepository: IVehicleRepository) { }

  async execute(id: string): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findOneIdVehicle(id);

    if (!vehicle) {
      throw new AppError("Não existe um veículo cadastrado com este ID!");
    }

    vehicle.createdAt = FormatDate(vehicle.createdAt);
    vehicle.updatedAt = FormatDate(vehicle.updatedAt);

    return vehicle;
  }
}
