import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransactionService } from "./createTransactionService";

export class CreateTransactionController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { type, idEmployee, idVehicle, date, amount } = request.body;

    const createTransactionService = container.resolve(CreateTransactionService);

    return response.status(201).json(
      await createTransactionService.execute({
        type,
        idEmployee,
        idVehicle,
        date,
        amount,
      }),
    );
  }
}
