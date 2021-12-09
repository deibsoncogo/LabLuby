import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListOneEmployeeService } from "./listOneEmployeeService";

export class ListOneEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const listOneEmployeeService = container.resolve(ListOneEmployeeService);

    return response.status(200).json(
      await listOneEmployeeService.execute(Number(cpf)),
    );
  }
}
