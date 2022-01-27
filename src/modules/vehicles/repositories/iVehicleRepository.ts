import { ICreateVehicleDto } from "../dtos/iCreateVehicleDto";
import { IFindAllVehicleFilterDto } from "../dtos/iFindAllVehicleFilterDto";
import { VehicleEntity } from "../entities/vehicleEntity";

export interface IVehicleRepository {
  deleteIdVehicle(id: string): Promise<void>;
  findOneIdVehicle(id: string): Promise<VehicleEntity>;

  findAllFilterVehicle(
    { category, brand, model, year, km, color, purchasePrice, status }: IFindAllVehicleFilterDto
  ): Promise<VehicleEntity[]>

  createVehicle(
    { category, brand, model, year, km, color, purchasePrice }: ICreateVehicleDto
  ): Promise<VehicleEntity>
}
