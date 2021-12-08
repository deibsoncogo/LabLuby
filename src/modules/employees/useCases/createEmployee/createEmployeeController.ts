import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEmployeeService } from "./createEmployeeService";

export class CreateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, avatarUrl } = request.body;

    const createEmployeeService = container.resolve(CreateEmployeeService);

    const employee = await createEmployeeService.execute({ name, cpf, email, password, avatarUrl });

    return response.status(201).json(employee);
  }
}
