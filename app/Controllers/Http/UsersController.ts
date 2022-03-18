import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
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
    const { ruleId, ...data } = request.only(['name', 'email', 'password', 'ruleId'])
    const user = await User.create(data)
    const rules = await user.related('rules').attach(ruleId.split(','))
    return response.status(201).json({ user, rules })
  }

  public async show({ params, request, response }: HttpContextContract) {
    await request.validate(UserIdValidator)
    const user = await User.findOrFail(params.id)
    const rules = await user.related('rules').query()
    const bets = await user.related('bets').query()
    return response.status(200).json({ user, rules, bets })
  }

  public async update({ params, request, response }: HttpContextContract) {
    await request.validate(UserUpdateValidator)
    const data = request.only(['name', 'email', 'password'])
    const user = await User.findOrFail(params.id)
    await user.merge(data).save()
    return response.status(201).json(user)
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    await request.validate(UserIdValidator)
    const user = await User.findOrFail(params.id)
    await user.related('rules').detach()
    await user.delete()
    return response.status(204)
  }
}
