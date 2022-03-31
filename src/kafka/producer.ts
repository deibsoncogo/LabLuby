import { Kafka, Producer, Message } from "kafkajs";

interface IProduceProps {
  topic: string,
  messages: Message[],
}

export class ProducerClass {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({ brokers: ["kafka:29092"] });
    this.producer = kafka.producer();
  }

  public async produce({ topic, messages }: IProduceProps) {
    await this.producer.connect();
    await this.producer.send({ topic, messages });
    await this.producer.disconnect();
  }
}
