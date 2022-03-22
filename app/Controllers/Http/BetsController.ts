import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bet from 'App/Models/Bet'
import { BetIdValidator } from 'App/Validators/Bet/BetIdValidator'
import { BetStoreValidator } from 'App/Validators/Bet/BetStoreValidator'
import { BetUpdateValidator } from 'App/Validators/Bet/BetUpdateValidator'
import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class BetsController {
  public async index({ response }: HttpContextContract) {
    const bets = await Bet.all()

    return response.status(200).json(bets)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(BetStoreValidator)

    const { item, userId, gameId } = request.all()

    const bet = await Bet.create({ item, userId, gameId })

    const user = await User.findOrFail(userId)

    try {
      await Mail.send((message) => {
        message
          .from('contact@teste.com', 'Prova Adonis V5 LabLuby')
          .replyTo('noreply@teste.com', 'Prova Adonis V5 LabLuby')
          .to(user.email)
          .subject('Nova aposta')
          .htmlView('emails/new_bet', { name: user.name, bet })
      })
    } catch (error) {
      return response.status(502).json(bet)
    }

    return response.status(201).json(bet)
  }

  public async show({ params, request, response }: HttpContextContract) {
    await request.validate(BetIdValidator)

    const bet = await Bet.findOrFail(params.id)

    const users = await bet.related('users').query()
    const games = await bet.related('games').query()

    return response.status(200).json({ bet, users, games })
  }

  public async update({ params, request, response }: HttpContextContract) {
    await request.validate(BetUpdateValidator)

    const { item, userId, gameId } = request.all()

    const bet = await Bet.findOrFail(params.id)

    await bet.merge({ item, userId, gameId }).save()

    return response.status(201).json(bet)
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    await request.validate(BetIdValidator)

    const bet = await Bet.findOrFail(params.id)

    await bet.delete()

    response.status(204)
  }
}
