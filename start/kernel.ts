import Server from '@ioc:Adonis/Core/Server'
// import cron from 'node-cron'
// import { ReminderToBetTask } from 'App/Tasks/ReminderToBetTask'
Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')])

Server.middleware.registerNamed({
  auth: () => import('../app/Middleware/Auth'),
  ruleLevelAdmin: () => import('../app/Middleware/RuleLevelAdmin'),
})

// cron.schedule('* 9 * * *', async () => {
//   console.log('schedule, ReminderToBetTask =>', new Date())
//   await new ReminderToBetTask().execute()
// })
