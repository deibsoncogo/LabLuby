import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Bet extends BaseModel {
  @column({ isPrimary: true })
  public id: uuid

  @column()
  public item: string

  @column()
  public userId: uuid

  @column()
  public gameId: uuid

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(bet: Bet) {
    bet.id = uuid()
  }
}
