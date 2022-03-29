import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserIdValidator } from 'App/Validators/User/UserIdValidator'
import { UserUpdateValidator } from 'App/Validators/User/UserUpdateValidator'
import { UserStoreValidator } from 'App/Validators/User/UserStoreValidator'
import Mail from '@ioc:Adonis/Addons/Mail'
import Rule from 'App/Models/Rule'

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

    try {
      await Mail.send((message) => {
        message
          .from('contact@teste.com', 'Prova Adonis V5 LabLuby')
          .replyTo('noreply@teste.com', 'Prova Adonis V5 LabLuby')
          .to(user.email)
          .subject('Novo cadastro')
          .htmlView('emails/new_user', { name: user.name, password })
      })
    } catch (error) {
      return response.status(502).json({ user, rule })
    }

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
