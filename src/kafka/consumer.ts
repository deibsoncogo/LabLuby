import { Kafka, Consumer } from "kafkajs";

interface IConsume {
  topic: string,
  fromBeginning: boolean,
}

export class ConsumerClass {
  private consumer: Consumer;

  constructor(groupId: string) {
    const kafka = new Kafka({
      clientId: "ConsumerProvaKafkaLabLuby",
      brokers: ["kafka3:9092", "kafka4:9092"],
    });

    this.consumer = kafka.consumer({ groupId });
  }

  public async consume({ topic, fromBeginning }: IConsume) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic: topic.toString(),
          partition: partition.toString(),
          message: message.value.toString(),
        });
      },
    });
  }
}
