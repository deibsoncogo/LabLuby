import { VehicleEntity } from "../entities/vehicleEntity";
import { ICreateVehicleDto } from "../useCases/createVehicle/createVehicleService";
import { IDeleteVehicleDto } from "../useCases/deleteVehicle/deleteVehicleService";
import { IFindAllVehicleFilterDto } from "../useCases/findAllVehicleFilter/findAllVehicleFilterService";
import { IFindOneVehicleDto } from "../useCases/findOneVehicle/findOneVehicleService";

export interface IVehicleRepository {
  deleteIdVehicle({ id }: IDeleteVehicleDto): Promise<void>;
  findOneIdVehicle({ id }: IFindOneVehicleDto): Promise<VehicleEntity>;

  findAllFilterVehicle(
    { category, brand, model, year, km, color, purchasePrice, status }: IFindAllVehicleFilterDto
  ): Promise<VehicleEntity[]>

  createVehicle(
    { category, brand, model, year, km, color, purchasePrice }: ICreateVehicleDto
  ): Promise<VehicleEntity>
}
