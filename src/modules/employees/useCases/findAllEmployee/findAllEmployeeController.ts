import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllEmployeeService } from "./findAllEmployeeService";

export class FindAllEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllEmployeeService = container.resolve(FindAllEmployeeService);

    return response.status(200).json(
      await findAllEmployeeService.execute(),
    );
  }
}
