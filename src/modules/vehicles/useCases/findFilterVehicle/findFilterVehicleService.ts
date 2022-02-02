import { inject, injectable } from "tsyringe";
import { FormatDate } from "../../../../utils/formatDate";
import { IFindFilterVehicleDto } from "../../dtos/iFindFilterVehicleDto";
import { VehicleEntity } from "../../entities/vehicleEntity";
import { IVehicleRepository } from "../../repositories/iVehicleRepository";

@injectable()
export class FindFilterVehicleService {
  constructor(@inject("VehicleRepository") private vehicleRepository: IVehicleRepository) { }

  async execute(
    { category, brand, model, year, km, color, purchasePrice, status }: IFindFilterVehicleDto,
  ): Promise<VehicleEntity[]> {
    const vehicleAll = await this.vehicleRepository.findFilterVehicle({
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
