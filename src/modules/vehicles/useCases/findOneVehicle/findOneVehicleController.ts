import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindOneVehicleService } from "./findOneVehicleService";

export class FindOneVehicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOneVehicleService = container.resolve(FindOneVehicleService);

    return response.status(200).json(
      await findOneVehicleService.execute(id),
    );
  }
}
