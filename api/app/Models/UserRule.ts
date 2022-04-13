import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserRule extends BaseModel {
  public static table = 'users_rules'

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: string

  @column()
  public ruleId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
