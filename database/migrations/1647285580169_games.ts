import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Games extends BaseSchema {
  protected tableName = 'games'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().unique().primary()
      table.string('type').notNullable().unique()
      table.string('description').notNullable()
      table.decimal('range').notNullable().checkPositive()
      table.decimal('price').notNullable().checkPositive()
      table.decimal('max_number').notNullable().checkPositive()
      table.string('color').notNullable().notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo('now()')
      table.timestamp('updated_at', { useTz: true }).defaultTo('now()')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
