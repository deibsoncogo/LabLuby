import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeCreate, beforeSave, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import Rule from './Rule'

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: string

  @column()
  public fullName: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public clientId: string

  @manyToMany(() => Rule, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'rule_id',
    pivotTable: 'users_rules',
    pivotTimestamps: true,
  })
  public rules: ManyToMany<typeof Rule>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static BeforeCreate (user: User) {
    user.id = v4()
  }

  @beforeSave()
  public static async BeforeSave (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
