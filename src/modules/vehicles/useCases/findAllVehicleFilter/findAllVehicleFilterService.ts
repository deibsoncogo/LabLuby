import { VehicleEntity } from "modules/vehicles/entities/vehicleEntity";
import { IVehicleRepository } from "modules/vehicles/repositories/iVehicleRepository";
import { inject, injectable } from "tsyringe";

export interface IFindAllVehicleFilterDto {
  category?: string;
  brand?: string;
  model?: string;
  year?: number;
  km?: number;
  color?: string;
  purchasePrice?: number;
  status?: string;
}

@injectable()
export class FindAllVehicleFilterService {
  constructor(@inject("VehicleRepository") private vehicleRepository: IVehicleRepository) { }

  async execute(
    { category, brand, model, year, km, color, purchasePrice, status }: IFindAllVehicleFilterDto,
  ): Promise<VehicleEntity[]> {
    const vehicle = await this.vehicleRepository.findAllFilter({
      category,
      brand,
      model,
      year,
      km,
      color,
      purchasePrice,
      status,
    });

    return vehicle;
  }
}
