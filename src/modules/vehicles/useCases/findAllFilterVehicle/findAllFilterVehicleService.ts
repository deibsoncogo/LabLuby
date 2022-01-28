import { IFindAllFilterVehicleDto } from "modules/vehicles/dtos/iFindAllFilterVehicleDto";
import { VehicleEntity } from "modules/vehicles/entities/vehicleEntity";
import { IVehicleRepository } from "modules/vehicles/repositories/iVehicleRepository";
import { inject, injectable } from "tsyringe";
import { FormatDate } from "utils/formatDate";

@injectable()
export class FindAllFilterVehicleService {
  constructor(@inject("VehicleRepository") private vehicleRepository: IVehicleRepository) { }

  async execute(
    { category, brand, model, year, km, color, purchasePrice, status }: IFindAllFilterVehicleDto,
  ): Promise<VehicleEntity[]> {
    const vehicleAll = await this.vehicleRepository.findAllFilterVehicle({
      category,
      brand,
      model,
      year,
      km,
      color,
      purchasePrice,
      status,
    });

    vehicleAll.map((vehicle) => {
      vehicle.createdAt = FormatDate(vehicle.createdAt);
      vehicle.updatedAt = FormatDate(vehicle.updatedAt);

      return vehicle;
    });

    return vehicleAll;
  }
}
