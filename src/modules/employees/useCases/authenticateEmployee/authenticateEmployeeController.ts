import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateEmployeeService } from "./authenticateEmployeeService";

export class AuthenticateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateEmployeeService = container.resolve(AuthenticateEmployeeService);

    return response.status(201).json(
      await authenticateEmployeeService.execute({ email, password }),
    );
  }
}
