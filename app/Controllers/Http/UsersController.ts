import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()
    return response.status(200).json(users)
  }

  public async store({ request, response }: HttpContextContract) {
    const { roleId, ...data } = request.only(['name', 'email', 'password', 'roleId'])
    const user = await User.create(data)
    const roles = await user.related('roles').attach(roleId.split(','))
    return response.status(201).json({ user, roles })
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const roles = await user.related('roles').query()
    const bets = await user.related('bets').query()
    return response.status(200).json({ user, roles, bets })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password'])
    const user = await User.findOrFail(params.id)
    await user.merge(data).save()
    return response.status(201).json(user)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.related('roles').detach()
    await user.delete()
    return response.status(204)
  }
}
