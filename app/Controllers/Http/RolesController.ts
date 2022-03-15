import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {
  public async index({ response }: HttpContextContract) {
    const role = await Role.all()
    return response.status(200).json(role)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['level'])
    const role = await Role.create(data)

    return response.status(201).json(role)
  }

  public async show({ params, response }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    const user = await role.related('user').query()

    return response.status(200).json({ role, user })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['level'])
    const role = await Role.findOrFail(params.id)

    role.merge(data)
    await role.save()

    return response.status(200).json(role)
  }

  public async destroy({ params }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    await role.delete()
  }
}
