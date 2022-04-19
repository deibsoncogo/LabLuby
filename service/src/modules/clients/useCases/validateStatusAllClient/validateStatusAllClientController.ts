import { Request, Response } from "express";
import { container } from "tsyringe";
import { ValidateStatusAllClientService } from "./validateStatusAllClientService";

export class ValidateStatusAllClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token = request.headers.authorization;

    const validateStatusAllClientService = container.resolve(ValidateStatusAllClientService);

    return response.status(201).json(
      await validateStatusAllClientService.execute(token),
    );
  }
}
