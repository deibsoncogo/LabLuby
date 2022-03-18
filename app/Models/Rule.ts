import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import User from './User'

export default class Rule extends BaseModel {
  @column({ isPrimary: true })
  public id: uuid

  @column()
  public level: string

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'rule_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'users_rules',
    pivotTimestamps: true,
  })
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(rule: Rule) {
    rule.id = uuid()
  }
}
