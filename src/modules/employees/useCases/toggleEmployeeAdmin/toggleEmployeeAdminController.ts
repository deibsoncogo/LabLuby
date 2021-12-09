import { Request, Response } from "express";
import { container } from "tsyringe";
import { ToggleEmployeeAdminService } from "./toggleEmployeeAdminService";

export class ToggleEmployeeAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.body;

    const toggleEmployeeAdminService = container.resolve(ToggleEmployeeAdminService);

    const employee = await toggleEmployeeAdminService.execute({ cpf });

    return response.status(201).json(employee);
  }
}
