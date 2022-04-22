import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {StoreUserValidator, UpdateUserValidator, IdUserValidator, DateUserValidator} from 'App/Validators/UserValidator'
import Hash from '@ioc:Adonis/Core/Hash'
import Rule from 'App/Models/Rule'
import axios from 'axios'

export default class UsersController {
  public async index ({ request, response }: HttpContextContract) {
    await request.validate(DateUserValidator)

    const { createdAtFrom, createdAtTo } = request.all()

    if (createdAtFrom > createdAtTo) {
      return response.status(406).json({ error: 'Datas informada de forma invertida' })
    }

    const users = await User.query()
      .where((query) => {
        createdAtFrom && query.andWhere('createdAt', '>=', new Date(`${createdAtFrom} 00:00:00`))
        createdAtTo && query.andWhere('createdAt', '<=', new Date(`${createdAtTo} 23:59:59`))
      })
      .andWhere('fullName', '!=', 'admin')
      .orderBy('createdAt', 'asc')

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

    if (user.clientId) {
      await axios.put(`${process.env.BASE_URL_MS}/client/${user.clientId}`, null, {
        params: { fullName: user.fullName, email: user.email },
      })
        .then()
        .catch((error) => {
          console.log(error.response.status, error.response.data)
        })
    }

    return response.status(201).json(user)
  }

  public async destroy ({ params, request, response }: HttpContextContract) {
    await request.validate(IdUserValidator)

    const user = await User.findOrFail(params.id)

    await user.delete()

    return response.status(205).json({ message: 'Usuário excluído'})
  }
}
