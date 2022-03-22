import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export class ReminderToBetTask {
  public async execute() {
    const users = await User.all()

    let dateFilter = new Date()
    dateFilter.setDate(new Date().getDate() - 7)

    for (const user of users) {
      const bets = await user.related('bets').query().where('created_at', '>=', dateFilter)

      if (bets.length === 0) {
        await Mail.send((message) => {
          message
            .from('noreply@provaadonisv5labluby.com')
            .to(user.email)
            .subject('Lembrete de aposta - Prova Adonis V5 LabLub')
            .htmlView('emails/reminder_to_bet', { name: user.name })
        })
      }
    }
  }
}
