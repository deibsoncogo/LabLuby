import "reflect-metadata";
import "./database";
import "./containers";
import express from "express";
import "express-async-errors";
import { Kafka, logLevel } from "kafkajs";
import { ErrorMiddleware } from "./middleware/errorMiddleware";
import { indexRouter } from "./routes";
import { MicroServiceConsumer } from "./utils/microServiceConsumer";

const app = express();

process.env.TZ = "America/Sao_Paulo";

app.use(express.json());
app.use(indexRouter);
app.use(ErrorMiddleware);

const kafka = new Kafka({
  clientId: "service",
  brokers: ["localhost:9092"],
  logLevel: logLevel.NOTHING,
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});

const consumer = kafka.consumer({ groupId: `SG${Math.random()}` });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "MSPApi" });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`${topic} [${partition} | ${message.offset}]`);
      MicroServiceConsumer(message.value);
    },
  });
}

run().catch(console.error);

app.listen(4444, () => console.log("Server is running on port 4444"));
