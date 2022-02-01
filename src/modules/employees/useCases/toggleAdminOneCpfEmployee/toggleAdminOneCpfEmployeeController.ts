import { Request, Response } from "express";
import { container } from "tsyringe";
import { ToggleAdminOneCpfEmployeeService } from "./toggleAdminOneCpfEmployeeService";

export class ToggleAdminOneCpfEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.body;

    const toggleAdminOneCpfEmployeeService = container.resolve(ToggleAdminOneCpfEmployeeService);

    return response.status(201).json(
      await toggleAdminOneCpfEmployeeService.execute(cpf),
    );
  }
}
