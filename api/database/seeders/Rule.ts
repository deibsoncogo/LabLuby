import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Rule from 'App/Models/Rule'

export default class RuleSeeder extends BaseSeeder {
  public async run () {
    await Rule.updateOrCreateMany('name', [
      { name: 'user' },
      { name: 'admin' },
    ])
  }
}
