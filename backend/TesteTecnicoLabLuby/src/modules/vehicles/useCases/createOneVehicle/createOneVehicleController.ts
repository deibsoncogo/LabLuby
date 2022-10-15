import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOneVehicleService } from "./createOneVehicleService";

export class CreateOneVehicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category, brand, model, year, km, color, purchasePrice } = request.body;

    const createOneVehicleService = container.resolve(CreateOneVehicleService);

    return response.status(201).json(
      await createOneVehicleService
        .execute({ category, brand, model, year, km, color, purchasePrice }),
    );
  }
}
