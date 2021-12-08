import { Request, Response } from "express";
import { container } from "tsyringe";
import { ToggleEmployeeService } from "./toggleEmployeeService";

export class ToggleEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { employeeToken } = request;
    const { cpf } = request.body;

    const idAdmin = employeeToken.id;

    const toggleEmployeeService = container.resolve(ToggleEmployeeService);

    const employeeToggle = await toggleEmployeeService.execute({ idAdmin, cpf });

    return response.status(201).json(employeeToggle);
  }
}
