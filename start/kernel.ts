import Server from '@ioc:Adonis/Core/Server'
import cron from 'node-cron'
import { ReminderToBetTask } from 'App/Tasks/ReminderToBetTask'
Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')])

Server.middleware.registerNamed({
  auth: () => import('../app/Middleware/Auth'),
  ruleLevelAdmin: () => import('../app/Middleware/RuleLevelAdmin'),
})

cron.schedule('* 09:00 * * *', async () => {
  await new ReminderToBetTask().execute()
})
