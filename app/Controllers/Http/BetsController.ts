import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bet from 'App/Models/Bet'

export default class BetsController {
  public async index({ response }: HttpContextContract) {
    const bets = await Bet.all()
    return response.status(200).json(bets)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['item', 'userId', 'gameId'])
    const bet = await Bet.create(data)
    return response.status(201).json(bet)
  }

  public async show({ params, response }: HttpContextContract) {
    const bet = await Bet.findOrFail(params.id)
    const users = await bet.related('users').query()
    const games = await bet.related('games').query()
    return response.status(200).json({ bet, users, games })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['item', 'userId', 'gameId'])
    const bet = await Bet.findOrFail(params.id)
    await bet.merge(data).save()
    return response.status(201).json(bet)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const bet = await Bet.findOrFail(params.id)
    await bet.delete()
    response.status(204)
  }
}
