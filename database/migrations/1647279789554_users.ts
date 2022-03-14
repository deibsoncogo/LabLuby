import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().notNullable().unique()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo('now()')
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo('now()')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
