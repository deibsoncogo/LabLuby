import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateVehicleService } from "./createVehicleService";

export class CreateVehicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category, brand, model, year, km, color, purchasePrice } = request.body;

    const createVehicleService = container.resolve(CreateVehicleService);

    return response.status(201).json(
      await createVehicleService.execute({ category, brand, model, year, km, color, purchasePrice }),
    );
  }
}
