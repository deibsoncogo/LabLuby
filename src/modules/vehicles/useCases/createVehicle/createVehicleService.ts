import { AppError } from "errors/appError";
import { VehicleEntity } from "modules/vehicles/entities/vehicleEntity";
import { IVehicleRepository } from "modules/vehicles/repositories/iVehicleRepository";
import { inject, injectable } from "tsyringe";
import { FormatDate } from "utils/formatDate";

export interface ICreateVehicleDto {
  category: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  color: string;
  purchasePrice: number;
}

@injectable()
export class CreateVehicleService {
  constructor(@inject("VehicleRepository") private vehicleRepository: IVehicleRepository) { }

  async execute(
    { category, brand, model, year, km, color, purchasePrice }: ICreateVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicleAlreadyExists = await this.vehicleRepository.findAllFilter({
      category,
      brand,
      model,
      year,
      color,
    });

    if (vehicleAlreadyExists.length !== 0) {
      throw new AppError("Já existe um veículo com estas especificações!");
    }

    const vehicle = await this.vehicleRepository.create({
      category,
      brand,
      model,
      year,
      km,
      color,
      purchasePrice,
    });

    vehicle.createdAt = FormatDate(vehicle.createdAt);
    vehicle.updatedAt = FormatDate(vehicle.updatedAt);

    return vehicle;
  }
}
