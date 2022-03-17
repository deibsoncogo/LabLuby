import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Bet from './Bet'

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  public id: uuid

  @column()
  public type: string

  @column()
  public description: string

  @column()
  public range: number

  @column()
  public price: number

  @column()
  public maxNumber: number

  @column()
  public color: string

  @hasMany(() => Bet, {
    foreignKey: 'gameId',
    localKey: 'id',
  })
  public bets: HasMany<typeof Bet>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(game: Game) {
    game.id = uuid()
  }
}
