import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IUpdateOneVehicleDto } from "../../dtos/iUpdateOneVehicleDto";
import { VehicleEntity } from "../../entities/vehicleEntity";
import { IVehicleRepository } from "../../repositories/iVehicleRepository";

@injectable()
export class UpdateOneVehicleService {
  constructor(@inject("VehicleRepository") private vehicleRepository: IVehicleRepository) {}

  async execute(
    { id, category, brand, model, year, km, color, purchasePrice }: IUpdateOneVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicleAlreadyExists = await this.vehicleRepository.findFilterVehicle({
      category,
      brand,
      model,
      year,
      color,
    });

    if (vehicleAlreadyExists.length !== 0) {
      throw new AppError("Já existe um veículo com estas especificações");
    }

    const vehicle = await this.vehicleRepository.updateOneVehicle({
      id,
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
