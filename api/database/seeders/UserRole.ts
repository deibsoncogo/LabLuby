import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Rule from 'App/Models/Rule'
import User from 'App/Models/User'
import UserRule from 'App/Models/UserRule'

export default class UserRoleSeeder extends BaseSeeder {
  public async run () {
    const user = await User.findBy('fullName', 'admin')

    const ruleUser = await Rule.findBy('name', 'user')
    const ruleAdmin = await Rule.findBy('name', 'admin')

    await UserRule.updateOrCreateMany(['userId', 'ruleId'], [
      { userId: user?.id, ruleId: ruleUser?.id },
      { userId: user?.id, ruleId: ruleAdmin?.id },
    ])
  }
}
