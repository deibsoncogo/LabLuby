import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteVehicleService } from "./deleteVehicleService";

export class DeleteVehicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteVehicleService = container.resolve(DeleteVehicleService);

    await deleteVehicleService.execute({ id });

    return response.status(202).json();
  }
}
