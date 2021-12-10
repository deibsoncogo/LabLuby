import { VehicleEntity } from "../entities/vehicleEntity";
import { ICreateVehicleDto } from "../useCases/createVehicle/createVehicleService";
import { IDeleteVehicleDto } from "../useCases/deleteVehicle/deleteVehicleService";
import { IFindAllVehicleFilterDto } from "../useCases/findAllVehicleFilter/findAllVehicleFilterService";
import { IFindOneVehicleDto } from "../useCases/findOneVehicle/findOneVehicleService";

export interface IVehicleRepository {
  deleteId({ id }: IDeleteVehicleDto): Promise<void>;
  findOneId({ id }: IFindOneVehicleDto): Promise<VehicleEntity>;

  findAllFilter(
    { category, brand, model, year, km, color, purchasePrice, status }: IFindAllVehicleFilterDto
  ): Promise<VehicleEntity[]>

  create(
    { category, brand, model, year, km, color, purchasePrice }: ICreateVehicleDto
  ): Promise<VehicleEntity>
}
