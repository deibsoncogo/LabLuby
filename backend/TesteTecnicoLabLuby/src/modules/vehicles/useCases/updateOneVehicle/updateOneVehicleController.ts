import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateOneVehicleService } from "./updateOneVehicleService";

export class UpdateOneVehicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { category, brand, model, year, km, color, purchasePrice } = request.query;

    const updateOneVehicleService = container.resolve(UpdateOneVehicleService);

    return response.status(201).json(
      await updateOneVehicleService.execute({
        id: id as string,
        category: category as string,
        brand: brand as string,
        model: model as string,
        year: Number(year as string),
        km: Number(km as string),
        color: color as string,
        purchasePrice: Number(purchasePrice as string),
      }),
    );
  }
}
