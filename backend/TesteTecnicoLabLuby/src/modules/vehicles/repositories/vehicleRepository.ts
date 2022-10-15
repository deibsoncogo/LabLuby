import { getRepository, Repository } from "typeorm";
import { ICreateOneVehicleDto } from "../dtos/iCreateOneVehicleDto";
import { IFindFilterVehicleDto } from "../dtos/iFindFilterVehicleDto";
import { IUpdateOneVehicleDto } from "../dtos/iUpdateOneVehicleDto";
import { VehicleEntity } from "../entities/vehicleEntity";
import { IVehicleRepository } from "./iVehicleRepository";

export class VehicleRepository implements IVehicleRepository {
  private vehicleRepository: Repository<VehicleEntity>;

  constructor() { this.vehicleRepository = getRepository(VehicleEntity); }

  async deleteOneIdVehicle(id: string): Promise<void> {
    await this.vehicleRepository.delete({ id });
  }

  async findOneIdVehicle(id: string): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findOne({ id });

    return vehicle;
  }

  async updateOneVehicle(
    { id, category, brand, model, year, km, color, purchasePrice }: IUpdateOneVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findOne({ id });

    vehicle.category = category || vehicle.category;
    vehicle.brand = brand || vehicle.brand;
    vehicle.model = model || vehicle.model;
    vehicle.year = year || vehicle.year;
    vehicle.km = km || vehicle.km;
    vehicle.color = color || vehicle.color;
    vehicle.purchasePrice = purchasePrice || vehicle.purchasePrice;
    vehicle.updatedAt = new Date();

    const vehicleSave = await this.vehicleRepository.save(vehicle);

    return vehicleSave;
  }

  async findFilterVehicle(
    { category, brand, model, year, km, color, purchasePrice, status }: IFindFilterVehicleDto,
  ): Promise<VehicleEntity[]> {
    const vehicleQuery = await this.vehicleRepository
      .createQueryBuilder("vehicle")
      .addOrderBy("vehicle.createdAt", "ASC");

    category && vehicleQuery.andWhere("vehicle.category = :category", { category });
    brand && vehicleQuery.andWhere("vehicle.brand = :brand", { brand });
    model && vehicleQuery.andWhere("vehicle.model = :model", { model });
    year && vehicleQuery.andWhere("vehicle.year = :year", { year });
    km && vehicleQuery.andWhere("vehicle.km = :km", { km });
    color && vehicleQuery.andWhere("vehicle.color = :color", { color });
    status && vehicleQuery.andWhere("vehicle.status = :status", { status });
    purchasePrice && vehicleQuery.andWhere(
      "vehicle.purchasePrice = :purchasePrice", { purchasePrice },
    );

    const vehicleGetMany = await vehicleQuery.getMany();

    return vehicleGetMany;
  }

  async createOneVehicle(
    { category, brand, model, year, km, color, purchasePrice }: ICreateOneVehicleDto,
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

    const vehicleSave = await this.vehicleRepository.save(vehicle);

    return vehicleSave;
  }
}
