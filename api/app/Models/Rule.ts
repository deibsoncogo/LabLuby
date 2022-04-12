import { BaseModel, beforeCreate, beforeFetch, beforeFind, column, ManyToMany, manyToMany, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import User from './User'

type PostQuery = ModelQueryBuilderContract<typeof Rule>

export default class Rule extends BaseModel {
  public static table = 'rules'

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

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
  public static BeforeCreate (rule: Rule) {
    rule.id = uuid()
  }

  @beforeFetch() @beforeFind()
  public static BeforeFetchFind (query: PostQuery) {
    query.orderBy('createdAt', 'asc')
  }
}
