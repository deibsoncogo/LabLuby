import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().unique().notNullable()
      table.string('type').notNullable()
      table.double('amount').notNullable()
      table.double('client_cpf_from')
      table.double('client_cpf_to')
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo('now()')
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo('now()')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
