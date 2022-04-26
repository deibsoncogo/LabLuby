import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Rule from 'App/Models/Rule'
import Transaction from 'App/Models/Transaction'
import User from 'App/Models/User'
import UserRule from 'App/Models/UserRule'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run () {
    await User.updateOrCreateMany('email', [{
      fullName: 'test',
      email: 'test@test.com',
      password: '12teST',
    }])

    const user = await User.findBy('fullName', 'test')
    const ruleUser = await Rule.findBy('name', 'user')

    await UserRule.updateOrCreateMany(['userId', 'ruleId'], [
      { userId: user?.id, ruleId: ruleUser?.id },
    ])

    await Transaction.createMany([{
      type: 'pix',
      amount: 50.56,
      clientIdFrom: '182dcc60-b1f7-4726-83ba-d5a5e20171bb',
      clientIdTo: '1c968057-6224-4018-9fbf-758ac79fe8cf',
    }])
  }
}
