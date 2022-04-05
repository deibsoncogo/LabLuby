import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Rule from 'App/Models/Rule'
import { UserIdValidator } from 'App/Validators/User/UserIdValidator'
import { UserUpdateValidator } from 'App/Validators/User/UserUpdateValidator'
import { UserStoreValidator } from 'App/Validators/User/UserStoreValidator'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()
    return response.status(200).json(users)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(UserStoreValidator)

    const { name, email, password } = request.all()
    const user = await User.create({ name, email, password })

    const rule = await Rule.findByOrFail('level', 'play')
    await user.related('rules').attach([rule.id])

    const message = { type: 'newUser', subject: 'Novo cadastro', email, name, password }

    await request.producer.send({
      topic: 'MicroServiceEmail',
      messages: [{ value: JSON.stringify(message) }],
    })

    return response.status(201).json({ user, rule })
  }

  public async show({ params, request, response }: HttpContextContract) {
    await request.validate(UserIdValidator)

    const user = await User.findOrFail(params.id)

    const rules = await user.related('rules').query()

    let dateFilter = new Date()
    dateFilter.setDate(new Date().getDate() - 30)
    const bets = await user.related('bets').query().where('created_at', '>=', dateFilter)

    return response.status(200).json({ user, rules, bets })
  }

  public async update({ params, request, response }: HttpContextContract) {
    await request.validate(UserUpdateValidator)

    const { name, email, password } = request.all()

    const user = await User.findOrFail(params.id)

    await user.merge({ name, email, password }).save()

    return response.status(201).json(user)
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    await request.validate(UserIdValidator)

    const user = await User.findOrFail(params.id)

    await user.delete()

    return response.status(204)
  }
}
