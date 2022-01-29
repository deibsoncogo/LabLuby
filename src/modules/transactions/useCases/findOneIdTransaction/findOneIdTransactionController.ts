import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindOneIdTransactionService } from "./findOneIdTransactionService";

export class FindOneIdTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOneIdTransactionService = container.resolve(FindOneIdTransactionService);

    return response.status(200).json(
      await findOneIdTransactionService.execute(id),
    );
  }
}
