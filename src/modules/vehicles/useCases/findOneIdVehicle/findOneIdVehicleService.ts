import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { FormatDate } from "../../../../utils/formatDate";
import { VehicleEntity } from "../../entities/vehicleEntity";
import { IVehicleRepository } from "../../repositories/iVehicleRepository";

@injectable()
export class FindOneIdVehicleService {
  constructor(@inject("VehicleRepository") private vehicleRepository: IVehicleRepository) { }

  async execute(id: string): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findOneIdVehicle(id);

    if (!vehicle) {
      throw new AppError("Não existe um veículo cadastrado com este ID");
    }

    vehicle.createdAt = FormatDate(vehicle.createdAt);
    vehicle.updatedAt = FormatDate(vehicle.updatedAt);

    return vehicle;
  }
}
