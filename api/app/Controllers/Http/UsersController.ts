import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {StoreUserValidator, UpdateUserValidator, IdUserValidator} from 'App/Validators/UserValidator'
import Hash from '@ioc:Adonis/Core/Hash'
import Rule from 'App/Models/Rule'

export default class UsersController {
  public async index ({ response }: HttpContextContract) {
    const users = await User.query()

    return response.status(200).json(users)
  }

  public async store ({ request, response }: HttpContextContract) {
    await request.validate(StoreUserValidator)

    const data = request.only(['fullName', 'email', 'password'])

    const user = await User.create(data)

    const rule = await Rule.findByOrFail('name', 'user')
    await user.related('rules').attach([rule.id])

    return response.status(201).json({ user, rule })
  }

  public async show ({ params, request, response }: HttpContextContract) {
    await request.validate(IdUserValidator)

    const user = await User.findOrFail(params.id)
    const rules = await user.related('rules').query()

    return response.status(200).json({ user, rules })
  }

  public async update ({ params, request, response }: HttpContextContract) {
    await request.validate(UpdateUserValidator)

    const data = request.only(['fullName', 'email', 'passwordOld', 'passwordNew'])

    const user = await User.findOrFail(params.id)

    const isVerifyPasswords = await Hash.verify(user.password, data.passwordOld)

    if (!isVerifyPasswords) {
      data.passwordNew = undefined
    }

    await user.merge({fullName: data.fullName,email: data.email,password: data.passwordNew }).save()

    return response.status(201).json(user)
  }

  public async destroy ({ params, request, response }: HttpContextContract) {
    await request.validate(IdUserValidator)

    const user = await User.findOrFail(params.id)

    await user.delete()

    return response.status(205).json({ message: 'Usuário excluído'})
  }
}
