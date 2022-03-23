import { DateTime } from 'luxon'
// eslint-disable-next-line prettier/prettier
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  public id: uuid

  @column()
  public minValue: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(cart: Cart) {
    cart.id = uuid()
  }
}
