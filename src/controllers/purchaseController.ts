import { Request, Response } from "express";
import { ProducerClass } from "../kafka/producer";

export class PurchaseController {
  public async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { id, quantity, purchaseId } = request.body;

      const data = JSON.stringify({ id, quantity, purchaseId });

      const producer = new ProducerClass();

      producer.produce({
        topic: "newPurchase",
        messages: [{ value: data }],
      });

      producer.produce({
        topic: "productBought",
        messages: [{ value: JSON.stringify({ productId: id, purchaseId }) }],
      });

      return response.status(200).json(data);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
