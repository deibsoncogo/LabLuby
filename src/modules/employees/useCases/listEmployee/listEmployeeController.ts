import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListEmployeeService } from "./listEmployeeService";

export class ListEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listEmployeeService = container.resolve(ListEmployeeService);

    return response.status(200).json(
      await listEmployeeService.execute(),
    );
  }
}
