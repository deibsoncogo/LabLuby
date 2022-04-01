import { Kafka, Producer as KafkaProducer, Message } from "kafkajs";

interface IProducerProps {
  topic: string,
  messages: Message[],
}

export default class Producer {
  private producer: KafkaProducer;

  constructor() {
    const kafka = new Kafka({ brokers: ["kafka:29092"] });
    this.producer = kafka.producer();
  }

  public async produce({ topic, messages }: IProducerProps) {
    await this.producer.connect();
    await this.producer.send({ topic, messages });
    await this.producer.disconnect();
  }
}
