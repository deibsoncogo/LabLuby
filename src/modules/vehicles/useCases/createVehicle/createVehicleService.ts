import { VehicleEntity } from "modules/vehicles/entities/vehicleEntity";
import { IVehicleRepository } from "modules/vehicles/repositories/iVehicleRepository";
import { inject, injectable } from "tsyringe";

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
    const vehicle = await this.vehicleRepository.create({
      category,
      brand,
      model,
      year,
      km,
      color,
      purchasePrice,
    });

    return vehicle;
  }
}
