import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersRolesController {
  public async store({ request, response }: HttpContextContract) {
    const { userId, roleId } = request.all()
    const user = await User.findOrFail(userId)
    const roles = await user.related('roles').attach(roleId.split(','))
    return response.status(201).json({ user, roles })
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    const { roleId } = request.all()
    const user = await User.findOrFail(params.id)
    await user.related('roles').detach(roleId.split(','))
    return response.status(204)
  }
}
