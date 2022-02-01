import { ICreateOneVehicleDto } from "../dtos/iCreateOneVehicleDto";
import { IFindFilterVehicleDto } from "../dtos/iFindFilterVehicleDto";
import { VehicleEntity } from "../entities/vehicleEntity";

export interface IVehicleRepository {
  deleteOneIdVehicle(id: string): Promise<void>;
  findOneIdVehicle(id: string): Promise<VehicleEntity>;

  findFilterVehicle(
    { category, brand, model, year, km, color, purchasePrice, status }: IFindFilterVehicleDto
  ): Promise<VehicleEntity[]>

  createOneVehicle(
    { category, brand, model, year, km, color, purchasePrice }: ICreateOneVehicleDto
  ): Promise<VehicleEntity>
}
