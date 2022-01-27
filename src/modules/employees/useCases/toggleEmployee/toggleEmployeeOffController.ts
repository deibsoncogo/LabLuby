import { Request, Response } from "express";
import { container } from "tsyringe";
import { ToggleEmployeeOffService } from "./toggleEmployeeOffService";

export class ToggleEmployeeOffController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.body;

    const toggleEmployeeOffService = container.resolve(ToggleEmployeeOffService);

    return response.status(201).json(
      await toggleEmployeeOffService.execute(cpf),
    );
  }
}
