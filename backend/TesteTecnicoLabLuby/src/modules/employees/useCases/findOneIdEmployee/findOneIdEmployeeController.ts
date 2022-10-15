import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindOneIdEmployeeService } from "./findOneIdEmployeeService";

export class FindOneIdEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const findOneIdEmployeeService = container.resolve(FindOneIdEmployeeService);

    return response.status(200).json(
      await findOneIdEmployeeService.execute(Number(cpf)),
    );
  }
}
