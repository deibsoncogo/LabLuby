import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllFilterTransactionService } from "./findAllFilterTransactionService";

export class FindAllFilterTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, idEmployee, idVehicle, date, amount } = request.query;

    const findAllFilterTransactionService = container.resolve(FindAllFilterTransactionService);

    return response.status(200).json(
      await findAllFilterTransactionService.execute({
        type: type as string,
        idEmployee: idEmployee as string,
        idVehicle: idVehicle as string,
        date: date && new Date(date as string),
        amount: Number(amount as string),
      }),
    );
  }
}
