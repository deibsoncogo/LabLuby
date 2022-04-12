import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersRules extends BaseSchema {
  protected tableName = 'users_rules'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable()

      table.uuid('user_id').notNullable()
        .references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')

      table.uuid('rule_id').notNullable()
        .references('id').inTable('rules').onUpdate('CASCADE').onDelete('CASCADE')

      table.unique(['user_id', 'rule_id'])

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
