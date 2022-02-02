import { Request, Response } from "express";
import { container } from "tsyringe";
import { ToggleTypeOneIdTransactionService } from "./toggleTypeOneIdTransactionService";

export class ToggleTypeOneIdTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const toggleTypeOneIdTransactionService = container.resolve(ToggleTypeOneIdTransactionService);

    return response.status(201).json(
      await toggleTypeOneIdTransactionService.execute(id),
    );
  }
}
