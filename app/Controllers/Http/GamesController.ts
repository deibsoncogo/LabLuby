import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from 'App/Models/Game'

export default class GamesController {
  public async index({ response }: HttpContextContract) {
    const games = await Game.all()
    return response.status(200).json(games)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['type', 'description', 'range', 'price', 'maxNumber', 'color'])
    const game = await Game.create(data)
    return response.status(201).json(game)
  }

  public async show({ params, response }: HttpContextContract) {
    const game = await Game.findOrFail(params.id)
    const bets = await game.related('bets').query()
    return response.status(200).json({ game, bets })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['type', 'description', 'range', 'price', 'maxNumber', 'color'])
    const game = await Game.findOrFail(params.id)
    await game.merge(data).save()
    return response.status(201).json(game)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const game = await Game.findOrFail(params.id)
    await game.delete()
    return response.status(204)
  }
}
