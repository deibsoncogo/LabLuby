import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindEmployeeService } from "./findEmployeeService";

export class FindEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findEmployeeService = container.resolve(FindEmployeeService);

    return response.status(200).json(
      await findEmployeeService.execute(),
    );
  }
}
