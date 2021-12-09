import { Request, Response } from "express";
import { container } from "tsyringe";
import { ToggleEmployeeService } from "./toggleEmployeeService";

export class ToggleEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.body;

    const toggleEmployeeService = container.resolve(ToggleEmployeeService);

    return response.status(201).json(
      await toggleEmployeeService.execute(cpf),
    );
  }
}
