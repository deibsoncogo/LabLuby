import { Kafka, logLevel } from 'kafkajs'

type IProps = {
  type: string,
  data: object,
}

export async function MicroServiceProducerUtils (props: IProps) {
  const kafka = new Kafka({
    clientId: 'api',
    brokers: ['localhost:9092'],
    logLevel: logLevel.NOTHING,
    retry: {
      initialRetryTime: 300,
      retries: 10,
    },
  })

  const producer = kafka.producer({
    transactionalId: `TP${Math.random()}`,
    maxInFlightRequests: 1,
    idempotent: true,
  })

  await producer.connect()

  await producer.send({
    topic: 'MSPApi',
    messages: [{ value: JSON.stringify(props) }],
  })

  await producer.disconnect()
}
