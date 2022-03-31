import { Kafka, Producer, Consumer } from "kafkajs";

export class TransactionService {
  private producer: Producer;

  private consumer: Consumer;

  constructor() {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["kafka1:9092", "kafka2:9092"],
    });

    this.producer = kafka.producer({});
    this.consumer = kafka.consumer({ groupId: "groupIdTest" });
  }

  public async transaction() {
    await this.producer.connect();
    await this.producer.send({
      topic: "topicProducerTest",
      messages: [{ value: "messageProducerTest" }],
    });
    await this.producer.disconnect();

    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: "topicConsumerTest",
      fromBeginning: true,
    });
    await this.consumer.run({
      eachBatch: async ({ topic, partition, message }) => {
        console.log({ value: message.value.toString });
      },
    });
  }
}
