import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteOneIdTransactionService } from "./deleteOneIdTransactionService";

export class DeleteOneIdTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOneIdTransactionService = container.resolve(DeleteOneIdTransactionService);

    return response.status(202).json(
      await deleteOneIdTransactionService.execute(id),
    );
  }
}
