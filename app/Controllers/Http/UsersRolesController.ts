import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersRolesController {
  public async store({ request, response }: HttpContextContract) {
    const { userId, roleId } = request.only(['userId', 'roleId'])
    const user = await User.find(userId)
    const role = await user?.related('role').attach(roleId.split(','))

    return response.status(201).json({ user, role })
  }

  public async destroy({ params, request }: HttpContextContract) {
    const { roleId } = request.only(['userId', 'roleId'])
    const user = await User.find(params.userId)

    await user?.related('role').detach(roleId.split(','))
  }
}
