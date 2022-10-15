import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindFilterTransactionService } from "./findFilterTransactionService";

export class FindFilterTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, idEmployee, idVehicle, date, amount } = request.query;

    const findFilterTransactionService = container.resolve(FindFilterTransactionService);

    return response.status(200).json(
      await findFilterTransactionService.execute({
        type: type as string,
        idEmployee: idEmployee as string,
        idVehicle: idVehicle as string,
        date: date && new Date(date as string),
        amount: Number(amount as string),
      }),
    );
  }
}
