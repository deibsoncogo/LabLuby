import express from "express";
import { Kafka, logLevel } from "kafkajs";
import { indexRouter } from "./routes";
import { SendEmailUtils } from "./utils/sendEmailUtils";

const app = express();

app.use(express.json());

const kafka = new Kafka({
  clientId: "service",
  brokers: ["localhost:9092"],
  logLevel: logLevel.NOTHING,
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});

const consumer = kafka.consumer({ groupId: "service-group" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "MicroServiceEmail" });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`${topic} [${partition} | ${message.offset}]`);
      SendEmailUtils(message.value);
    },
  });
}

run().catch(console.error);

app.use(indexRouter);

app.listen(2022, () => {
  console.log("Server is running on port 2022");
});
