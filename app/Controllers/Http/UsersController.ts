import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserIdValidator } from 'App/Validators/User/UserIdValidator'
import { UserUpdateValidator } from 'App/Validators/User/UserUpdateValidator'
import { UserStoreValidator } from 'App/Validators/User/UserStoreValidator'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()
    return response.status(200).json(users)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(UserStoreValidator)
    const data = request.only(['name', 'email', 'password'])
    const user = await User.create(data)

    await Mail.send((message) => {
      message
        .from('noreply@provaadonisv5labluby.com')
        .to(user.email)
        .subject('Prova Adonis V5 LabLub - Novo cadastro')
        .htmlView('emails/new_user', { name: user.name, password: data.password })
    })

    return response.status(201).json(user)
  }

  public async show({ params, request, response }: HttpContextContract) {
    await request.validate(UserIdValidator)

    let dateFilter = new Date()
    dateFilter.setDate(new Date().getDate() - 30)

    const user = await User.findOrFail(params.id)
    const rules = await user.related('rules').query()
    const bets = await user.related('bets').query().where('created_at', '>=', dateFilter)
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
    await user.delete()
    return response.status(204)
  }
}
