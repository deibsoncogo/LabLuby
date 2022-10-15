import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Rules extends BaseSchema {
  protected tableName = 'rules'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().unique().primary()
      table.string('level').notNullable().unique()
      table.timestamp('created_at', { useTz: true }).defaultTo('now()')
      table.timestamp('updated_at', { useTz: true }).defaultTo('now()')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
