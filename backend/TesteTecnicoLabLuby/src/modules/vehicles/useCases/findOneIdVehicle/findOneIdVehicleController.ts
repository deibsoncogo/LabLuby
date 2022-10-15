import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindOneIdVehicleService } from "./findOneIdVehicleService";

export class FindOneIdVehicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOneIdVehicleService = container.resolve(FindOneIdVehicleService);

    return response.status(200).json(
      await findOneIdVehicleService.execute(id),
    );
  }
}
