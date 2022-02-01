import { ICreateOneVehicleDto } from "../dtos/iCreateOneVehicleDto";
import { IFindFilterVehicleDto } from "../dtos/iFindFilterVehicleDto";
import { VehicleEntity } from "../entities/vehicleEntity";

export interface IVehicleRepository {
  deleteIdVehicle(id: string): Promise<void>;
  findOneIdVehicle(id: string): Promise<VehicleEntity>;

  findAllFilterVehicle(
    { category, brand, model, year, km, color, purchasePrice, status }: IFindFilterVehicleDto
  ): Promise<VehicleEntity[]>

  createVehicle(
    { category, brand, model, year, km, color, purchasePrice }: ICreateOneVehicleDto
  ): Promise<VehicleEntity>
}
