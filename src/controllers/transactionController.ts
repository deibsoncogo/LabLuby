import { Request, Response } from "express";
import { Kafka } from "kafkajs";

export class TransactionController {
  public async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { id, quantity, purchaseId } = request.body;

      const data = JSON.stringify({ id, quantity, purchaseId });

      const kafka = new Kafka({
        clientId: "my-app",
        brokers: ["kafka1:9092", "kafka2:9092"],
      });

      const producer = kafka.producer();
      const consumer = kafka.consumer({ groupId: "test-group" });

      const run = async () => {
        await producer.connect();
        await producer.send({
          topic: "test-topic",
          messages: [
            { value: "Hello KafkaJS user!" },
          ],
        });

        await consumer.connect();
        await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
        await consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            console.log({
              partition,
              offset: message.offset,
              value: message.value.toString(),
            });
          },
        });
      };

      run().catch(console.error);

      return response.status(200).json(data);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
