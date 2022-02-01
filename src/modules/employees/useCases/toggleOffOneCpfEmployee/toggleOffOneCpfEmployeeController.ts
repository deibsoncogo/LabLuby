import { Request, Response } from "express";
import { container } from "tsyringe";
import { ToggleOffOneCpfEmployeeService } from "./toggleOffOneCpfEmployeeService";

export class ToggleOffOneCpfEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.body;

    const toggleOffOneCpfEmployeeService = container.resolve(ToggleOffOneCpfEmployeeService);

    return response.status(201).json(
      await toggleOffOneCpfEmployeeService.execute(cpf),
    );
  }
}
