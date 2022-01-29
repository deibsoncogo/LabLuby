import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateOneIdTransactionService } from "./updateOneIdTransactionService";

export class UpdateOneIdTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { type, idEmployee, idVehicle, date, amount } = request.query;

    const updateOneIdTransactionService = container.resolve(UpdateOneIdTransactionService);

    return response.status(201).json(
      await updateOneIdTransactionService.execute({
        id,
        type: type as string,
        idEmployee: idEmployee as string,
        idVehicle: idVehicle as string,
        date: date && new Date(date as string),
        amount: Number(amount as string),
      }),
    );
  }
}
