import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAuthenticateOneEmployeeService } from "./createAuthenticateOneEmployeeService";

export class CreateAuthenticateOneEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createAuthenticateOneEmployeeService = container
      .resolve(CreateAuthenticateOneEmployeeService);

    return response.status(201).json(
      await createAuthenticateOneEmployeeService.execute({ email, password }),
    );
  }
}
