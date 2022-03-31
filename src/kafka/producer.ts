import { Kafka, Producer, Message } from "kafkajs";

interface IProduce {
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

    this.producer = kafka.producer({
      allowAutoTopicCreation: false,
      transactionTimeout: 30000,
    });
  }

  public async produce({ topic, messages }: IProduce) {
    await this.producer.connect();
    await this.producer.send({ topic, messages });
    await this.producer.disconnect();
  }
}
