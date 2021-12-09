import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateEmployeeService } from "./updateEmployeeService";

export class UpdateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idEmployee } = request.params;
    const employeeUpdate = request.body;

    const updateEmployeeService = container.resolve(UpdateEmployeeService);

    const employeeNew = await updateEmployeeService.execute({ employeeUpdate, idEmployee });

    return response.status(201).json(employeeNew);
  }
}
