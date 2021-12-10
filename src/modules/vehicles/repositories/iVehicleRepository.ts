import { VehicleEntity } from "../entities/vehicleEntity";
import { ICreateVehicleDto } from "../useCases/createVehicle/createVehicleService";

export interface IVehicleRepository {
  create(
    { category, brand, model, year, km, color, purchasePrice }: ICreateVehicleDto
  ): Promise<VehicleEntity>
}
