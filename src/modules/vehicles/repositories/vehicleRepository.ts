import { getRepository, Repository } from "typeorm";
import { VehicleEntity } from "../entities/vehicleEntity";
import { ICreateVehicleDto } from "../useCases/createVehicle/createVehicleService";
import { IVehicleRepository } from "./iVehicleRepository";

export class VehicleRepository implements IVehicleRepository {
  private vehicleRepository: Repository<VehicleEntity>;

  constructor() { this.vehicleRepository = getRepository(VehicleEntity); }

  async create(
    { category, brand, model, year, km, color, purchasePrice }: ICreateVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.create({
      category,
      brand,
      model,
      year,
      km,
      color,
      purchasePrice,
      status: "disponível",
    });

    await this.vehicleRepository.save(vehicle);

    return vehicle;
  }
}
