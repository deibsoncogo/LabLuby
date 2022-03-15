import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import Game from './Game'
import User from './User'

export default class Bet extends BaseModel {
  @column({ isPrimary: true })
  public id: uuid

  @column()
  public item: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public userId: uuid

  @belongsTo(() => Game)
  public game: BelongsTo<typeof Game>

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
