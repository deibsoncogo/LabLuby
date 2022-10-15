import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Transaction extends BaseModel {
  public static table = 'transactions'

  @column({ isPrimary: true })
  public id: string

  @column()
  public type: string

  @column()
  public amount: number

  @column()
  public clientIdFrom: string

  @column()
  public clientIdTo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static BeforeCreate (transaction: Transaction) {
    transaction.id = uuid()
  }
}
