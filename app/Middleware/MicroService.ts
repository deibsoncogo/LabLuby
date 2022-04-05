import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Kafka, logLevel } from 'kafkajs'

export default class MicroService {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const kafka = new Kafka({
      clientId: 'api',
      brokers: ['localhost:9092'],
      logLevel: logLevel.NOTHING,
      retry: {
        initialRetryTime: 300,
        retries: 10,
      },
    })

    const producer = kafka.producer()

    request.producer = producer

    await producer.connect()

    await next()
  }
}
