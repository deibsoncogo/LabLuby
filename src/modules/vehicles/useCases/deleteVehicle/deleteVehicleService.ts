import { AppError } from "errors/appError";
import { IVehicleRepository } from "modules/vehicles/repositories/iVehicleRepository";
import { inject, injectable } from "tsyringe";

export interface IDeleteVehicleDto {
  id: string;
}

@injectable()
export class DeleteVehicleService {
  constructor(@inject("VehicleRepository") private vehicleRepository: IVehicleRepository) { }

  async execute({ id }: IDeleteVehicleDto): Promise<void> {
    const idExists = await this.vehicleRepository.findOneIdVehicle({ id });

    if (!idExists) {
      throw new AppError("Não existe um veículo com este ID!");
    }

    await this.vehicleRepository.deleteIdVehicle({ id });
  }
}
