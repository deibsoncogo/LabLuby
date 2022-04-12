import { DateTime } from 'luxon'
// eslint-disable-next-line max-len
import { BaseModel, beforeCreate, beforeFetch, beforeFind, beforeSave, column, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { v4 } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'

type UserQuery = ModelQueryBuilderContract<typeof User>

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

  @beforeFetch() @beforeFind()
  public static beforeFetchFind (query: UserQuery) {
    query
      .andWhere('fullName', '!=', 'admin')
      .andWhere('fullName', '!=', 'super')
      .orderBy('createdAt', 'asc')
  }
}
