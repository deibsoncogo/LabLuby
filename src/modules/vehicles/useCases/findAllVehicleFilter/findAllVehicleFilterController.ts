import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllVehicleFilterService } from "./findAllVehicleFilterService";

export class FindAllVehicleFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category, brand, model, year, km, color, purchasePrice, status } = request.query;

    const findAllVehicleFilterService = container.resolve(FindAllVehicleFilterService);

    return response.status(200).json(
      await findAllVehicleFilterService.execute({
        category: category as string,
        brand: brand as string,
        model: model as string,
        year: Number(year as string),
        km: Number(km as string),
        color: color as string,
        purchasePrice: Number(purchasePrice as string),
        status: status as string,
      }),
    );
  }
}
