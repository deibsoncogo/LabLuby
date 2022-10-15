import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteVehicleService } from "./deleteOneIdVehicleService";

export class DeleteOneIdVehicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOneIdVehicleService = container.resolve(DeleteVehicleService);

    await deleteOneIdVehicleService.execute(id);

    return response.status(202).json();
  }
}
