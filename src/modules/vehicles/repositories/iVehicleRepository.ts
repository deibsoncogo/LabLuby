import { VehicleEntity } from "../entities/vehicleEntity";
import { ICreateVehicleDto } from "../useCases/createVehicle/createVehicleService";
import { IFindOneVehicleDto } from "../useCases/findOneVehicle/findOneVehicleService";

export interface IVehicleRepository {
  findOneId({ id }: IFindOneVehicleDto): Promise<VehicleEntity>;

  create(
    { category, brand, model, year, km, color, purchasePrice }: ICreateVehicleDto
  ): Promise<VehicleEntity>
}
