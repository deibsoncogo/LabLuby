import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindOneEmployeeService } from "./findOneEmployeeService";

export class FindOneEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const findOneEmployeeService = container.resolve(FindOneEmployeeService);

    return response.status(200).json(
      await findOneEmployeeService.execute(Number(cpf)),
    );
  }
}
