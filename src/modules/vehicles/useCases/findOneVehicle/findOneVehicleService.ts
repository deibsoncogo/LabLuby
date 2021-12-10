import { AppError } from "errors/appError";
import { VehicleEntity } from "modules/vehicles/entities/vehicleEntity";
import { IVehicleRepository } from "modules/vehicles/repositories/iVehicleRepository";
import { inject, injectable } from "tsyringe";

export interface IFindOneVehicleDto {
  id: string
}

@injectable()
export class FindOneVehicleService {
  constructor(@inject("VehicleRepository") private vehicleRepository: IVehicleRepository) { }

  async execute({ id }: IFindOneVehicleDto): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findOneId({ id });

    if (!vehicle) {
      throw new AppError("Não existe um veículo cadastrado com este ID!");
    }

    return vehicle;
  }
}
