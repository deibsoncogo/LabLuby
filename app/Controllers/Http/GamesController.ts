import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from 'App/Models/Game'
import { GameIdValidator } from 'App/Validators/Game/GameIdValidator'
import { GameStoreValidator } from 'App/Validators/Game/GameStoreValidator'
import { GameUpdateValidator } from 'App/Validators/Game/GameUpdateValidator'

export default class GamesController {
  public async index({ response }: HttpContextContract) {
    const games = await Game.query().orderBy('createdAt', 'asc')

    return response.status(200).json(games)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(GameStoreValidator)

    const { type, description, range, price, maxNumber, color } = request.all()

    const game = await Game.create({ type, description, range, price, maxNumber, color })

    return response.status(201).json(game)
  }

  public async show({ params, request, response }: HttpContextContract) {
    await request.validate(GameIdValidator)

    const game = await Game.findOrFail(params.id)
    const bets = await game.related('bets').query()

    return response.status(200).json({ game, bets })
  }

  public async update({ params, request, response }: HttpContextContract) {
    await request.validate(GameUpdateValidator)

    const { type, description, range, price, maxNumber, color } = request.all()

    const game = await Game.findOrFail(params.id)

    await game.merge({ type, description, range, price, maxNumber, color }).save()

    return response.status(201).json(game)
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    await request.validate(GameIdValidator)

    const game = await Game.findOrFail(params.id)

    await game.delete()

    return response.status(204)
  }
}
