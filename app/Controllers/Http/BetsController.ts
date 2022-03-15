import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bet from 'App/Models/Bet'

export default class BetsController {
  public async index({ response }: HttpContextContract) {
    const bet = await Bet.all()
    return response.status(200).json(bet)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['item', 'userId', 'gameId'])
    const bet = await Bet.create(data)

    return response.status(201).json(bet)
  }

  public async show({ params, response }: HttpContextContract) {
    const bet = await Bet.findOrFail(params.id)

    const user = await bet.related('user').query()
    const game = await bet.related('game').query()

    return response.status(200).json({ bet, user, game })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['item', 'userId', 'gameId'])
    const bet = await Bet.findOrFail(params.id)

    bet.merge(data)
    await bet.save()

    return response.status(200).json(bet)
  }

  public async destroy({ params }: HttpContextContract) {
    const bet = await Bet.findOrFail(params.id)
    await bet.delete()
  }
}
