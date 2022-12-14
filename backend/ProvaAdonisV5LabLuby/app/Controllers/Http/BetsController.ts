import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bet from 'App/Models/Bet'
import User from 'App/Models/User'
import Game from 'App/Models/Game'
import Cart from 'App/Models/Cart'
import { BetIdValidator } from 'App/Validators/Bet/BetIdValidator'
import { BetStoreValidator } from 'App/Validators/Bet/BetStoreValidator'
import { BetUpdateValidator } from 'App/Validators/Bet/BetUpdateValidator'

export default class BetsController {
  public async index({ response }: HttpContextContract) {
    const bets = await Bet.all()

    return response.status(200).json(bets)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(BetStoreValidator)

    const { userId, games } = request.all()

    let valueCart = 0
    for (const item of games) {
      const game = await Game.findOrFail(item.gameId)
      valueCart += Number(game.price)
    }

    const cart = await Cart.query().orderBy('createdAt', 'desc').first()

    if (!cart || valueCart < cart?.minValue) {
      return response.status(406).json({ error: 'Valor mínimo do carrinho não atingido' })
    }

    const betAll = []
    for (const index in games) {
      const itemLength = games[index].item.split(',').length
      const game = await Game.findOrFail(games[index].gameId)

      if (itemLength !== Number(game.maxNumber)) {
        return response.status(406).json({ error: 'Quantidade de número do jogo inválido' })
      }

      const bet = await Bet.create({ userId, item: games[index].item, gameId: games[index].gameId })

      betAll.push(bet)
    }

    const betLength = betAll.length
    const plural = betLength > 1 ? 's' : ''
    const user = await User.findOrFail(userId)

    const message = {
      type: 'newBet',
      subject: 'Nova aposta',
      email: user.email,
      name: user.name,
      betLength,
      plural,
    }

    await request.producer.send({
      topic: 'MicroServiceEmail',
      messages: [{ value: JSON.stringify(message) }],
    })

    const users = await User.all()

    for (const userAdmin of users) {
      const isAdmin = await userAdmin.related('rules').query().where('level', '=', 'admin')

      if (isAdmin) {
        const messageAdmin = {
          type: 'newBetAdmin',
          subject: 'Nova aposta - Admin',
          email: userAdmin.email,
          name: user.name,
          betLength,
          plural,
        }

        await request.producer.send({
          topic: 'MicroServiceEmail',
          messages: [{ value: JSON.stringify(messageAdmin) }],
        })
      }
    }

    return response.status(201).json({ userId, betAll })
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
