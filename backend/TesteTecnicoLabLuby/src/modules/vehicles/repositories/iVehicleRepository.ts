import { ICreateOneVehicleDto } from "../dtos/iCreateOneVehicleDto";
import { IFindFilterVehicleDto } from "../dtos/iFindFilterVehicleDto";
import { IUpdateOneVehicleDto } from "../dtos/iUpdateOneVehicleDto";
import { VehicleEntity } from "../entities/vehicleEntity";

export interface IVehicleRepository {
  deleteOneIdVehicle(id: string): Promise<void>;
  findOneIdVehicle(id: string): Promise<VehicleEntity>;

  updateOneVehicle(
    { id, category, brand, model, year, km, color, purchasePrice }: IUpdateOneVehicleDto
  ): Promise<VehicleEntity>;

  findFilterVehicle(
    { category, brand, model, year, km, color, purchasePrice, status }: IFindFilterVehicleDto
  ): Promise<VehicleEntity[]>;

  createOneVehicle(
    { category, brand, model, year, km, color, purchasePrice }: ICreateOneVehicleDto
  ): Promise<VehicleEntity>;
}
