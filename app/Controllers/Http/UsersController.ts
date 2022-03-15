import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const user = await User.all()
    return response.status(200).json(user)
  }

  public async store({ request, response }: HttpContextContract) {
    const { roleId, ...data } = request.only(['name', 'email', 'password', 'roleId'])
    const user = await User.create(data)
    const role = await user?.related('role').attach(roleId.split(','))

    return response.status(201).json({ user, role })
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const role = await user.related('role').query()
    const bet = await user.related('bet').query()

    return response.status(200).json({ user, role, bet })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password'])
    const user = await User.findOrFail(params.id)

    user.merge(data)
    await user.save()

    return response.status(200).json(user)
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await user.related('role').detach()
    await user.delete()
  }
}
