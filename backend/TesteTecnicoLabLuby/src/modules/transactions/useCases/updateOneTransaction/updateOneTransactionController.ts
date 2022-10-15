import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateOneTransactionService } from "./updateOneTransactionService";

export class UpdateOneTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { idEmployee, idVehicle, date, amount } = request.query;

    const updateOneTransactionService = container.resolve(UpdateOneTransactionService);

    return response.status(201).json(
      await updateOneTransactionService.execute({
        id,
        idEmployee: idEmployee as string,
        idVehicle: idVehicle as string,
        date: date && new Date(date as string),
        amount: Number(amount as string),
      }),
    );
  }
}
