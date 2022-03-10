import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    const uniqueKey = 'email'

    await User.updateOrCreateMany(uniqueKey, [
      {
        email: 'primeiro@teste.com',
        password: '321',
      },
      {
        email: 'segundo@teste.com',
        password: '654',
      },
    ])
  }
}
