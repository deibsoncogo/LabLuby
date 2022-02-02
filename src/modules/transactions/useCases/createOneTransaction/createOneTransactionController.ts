import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOneTransactionService } from "./createOneTransactionService";

export class CreateOneTransactionController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { type, idEmployee, idVehicle, date, amount } = request.body;

    const createOneTransactionService = container.resolve(CreateOneTransactionService);

    return response.status(201).json(
      await createOneTransactionService.execute({
        type,
        idEmployee,
        idVehicle,
        date,
        amount,
      }),
    );
  }
}
