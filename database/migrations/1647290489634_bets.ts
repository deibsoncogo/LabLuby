import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bets extends BaseSchema {
  protected tableName = 'bets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().unique().primary()
      table.string('item').notNullable()
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .uuid('game_id')
        .notNullable()
        .references('id')
        .inTable('games')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).defaultTo('now()')
      table.timestamp('updated_at', { useTz: true }).defaultTo('now()')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
