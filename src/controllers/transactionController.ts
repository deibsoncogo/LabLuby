import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";

export class TransactionController {
  public async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { id, quantity, purchaseId } = request.body;

      const data = JSON.stringify({ id, quantity, purchaseId });

      const producer = new TransactionService();

      producer.transaction();

      return response.status(200).json(data);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
