import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOneEmployeeService } from "./createOneEmployeeService";

export class CreateOneEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password } = request.body;

    const createOneEmployeeService = container.resolve(CreateOneEmployeeService);

    return response.status(201).json(
      await createOneEmployeeService.execute({ name, cpf, email, password }),
    );
  }
}
