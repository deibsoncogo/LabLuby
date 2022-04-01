import { Kafka, Consumer } from "kafkajs";

interface IConsumerConstructor {
  groupId: string,
}

interface IConsumer {
  topic: string,
  fromBeginning: boolean,
}

export class ConsumerClass {
  private consumer: Consumer;

  constructor({ groupId }: IConsumerConstructor) {
    const kafka = new Kafka({
      clientId: "ConsumerProvaKafkaLabLuby",
      brokers: ["kafka3:9092", "kafka4:9092"],
    });

    this.consumer = kafka.consumer({ groupId });
  }

  public async execute({ topic, fromBeginning }: IConsumer) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({ topic, partition, value: message.value?.toString() });
      },
    });
  }
}
