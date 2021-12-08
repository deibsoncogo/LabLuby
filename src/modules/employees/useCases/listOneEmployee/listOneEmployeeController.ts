import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListOneEmployeeService } from "./listOneEmployeeService";

export class ListOneEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listOneEmployeeService = container.resolve(ListOneEmployeeService);

    const employee = await listOneEmployeeService.execute(id);

    return response.status(200).json(employee);
  }
}
