import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListEmployeeService } from "./listEmployeeService";

export class ListEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { employeeToken } = request;
    const listEmployeeService = container.resolve(ListEmployeeService);

    const employeeAll = await listEmployeeService.execute(employeeToken.isAdmin);

    return response.status(200).json(employeeAll);
  }
}
