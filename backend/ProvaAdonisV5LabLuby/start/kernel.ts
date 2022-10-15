import Server from '@ioc:Adonis/Core/Server'
import cron from 'node-cron'
import { ReminderToBetTask } from 'App/Tasks/ReminderToBetTask'

Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')])

Server.middleware.registerNamed({
  microService: () => import('App/Middleware/MicroService'),
  auth: () => import('App/Middleware/Auth'),
  ruleLevelAdmin: () => import('App/Middleware/RuleLevelAdmin'),
})

cron.schedule('0 9 * * *', async () => {
  console.log('schedule, ReminderToBetTask =>', new Date())
  await new ReminderToBetTask().execute()
})
