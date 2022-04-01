import { Request, Response } from "express";
import { ProducerClass } from "../kafka/producer";

export class TransactionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id, quantity, purchaseId } = request.body;

      const data = JSON.stringify({ id, quantity, purchaseId });

      const producerClass = new ProducerClass();

      producerClass.execute({
        topic: "new-purchase",
        messages: [{ value: data }],
      });

      producerClass.execute({
        topic: "product-bought",
        messages: [{ value: JSON.stringify({ productId: id, purchaseId }) }],
      });

      return response.status(200).json(data);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
