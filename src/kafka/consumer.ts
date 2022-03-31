import { Kafka, Consumer } from "kafkajs";
import { socketServer } from "../server";

interface IConsumer {
  groupId: string,
}

interface IConsume {
  topic: string,
  fromBeginning: boolean,
}

export class ConsumerClass {
  private consumer: Consumer;

  constructor({ groupId }: IConsumer) {
    const kafka = new Kafka({ brokers: ["workshop_kafka_1:29092"] });
    this.consumer = kafka.consumer({ groupId });
  }

  public async consume({ topic, fromBeginning }: IConsume) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({ value: message.value?.toString() });

        socketServer.emit("newPercentage", message.value?.toString());
      },
    });
  }
}
