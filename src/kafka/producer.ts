import { Kafka, Producer, Message } from "kafkajs";

interface IProducer {
  topic: string,
  messages: Message[],
}

export class ProducerClass {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: "ProducerProvaKafkaLabLuby",
      brokers: ["kafka1:9092", "kafka2:9092"],
    });

    this.producer = kafka.producer();
  }

  public async execute({ topic, messages }: IProducer) {
    await this.producer.connect();
    await this.producer.send({ topic, messages });
    await this.producer.disconnect();
  }
}
