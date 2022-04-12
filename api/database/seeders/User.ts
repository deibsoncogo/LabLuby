import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.updateOrCreateMany('email', [{
      fullName: 'admin',
      email: process.env.USER_ADMIN_EMAIL,
      password: process.env.USER_ADMIN_PASSWORD,
    }])
  }
}
