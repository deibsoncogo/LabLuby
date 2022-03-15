import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Bet from './Bet'
import Role from './Role'

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: uuid

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @manyToMany(() => Role, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
    pivotTable: 'users_roles',
    pivotTimestamps: true,
  })
  public role: ManyToMany<typeof Role>

  @hasMany(() => Bet, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  public bet: HasMany<typeof Bet>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuid()
  }
}
