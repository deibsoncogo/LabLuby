import test from 'japa'
import supertest from 'supertest'
import Rule from 'App/Models/Rule'
import User from 'App/Models/User'
import Cart from 'App/Models/Cart'
import Game from 'App/Models/Game'

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Bet', (group) => {
  let rule: Rule, user: User, token: any, cart: Cart, game: Game

  group.before(async () => {
    rule = new Rule()
    rule.level = 'play'
    await rule.save()

    user = new User()
    user.name = 'Usuário Segundo Teste'
    user.email = 'devsegundo@outlook.com'
    user.password = '22bbBB'
    await user.save()

    // await user.related('rules').attach([rule.id])

    const responseToken = await supertest(baseUrl)
      .post('/user/login')
      .send({
        email: 'devsegundo@outlook.com',
        password: '22bbBB',
      })
      .expect(201)

    token = responseToken.body.token

    cart = new Cart()
    cart.minValue = 2
    await cart.save()

    game = new Game()
    game.type = 'Tipo Primeiro'
    game.description = 'Descrição Primeiro'
    game.range = 20
    game.price = 3
    game.maxNumber = 6
    game.color = '#ABCDEF'
    await game.save()
  })

  group.after(async () => {
    await game.delete()
    await cart.delete()
    await user.delete()
    await rule.delete()
  })

  test('It must be possible to register a new game', async () => {
    console.log('token.token =>', token.token)

    await supertest(baseUrl)
      .post('/bet')
      .set({ Authorization: `Bearer ${token.token}` })
      .send({
        userId: user.id,
        games: [
          {
            item: '1,2,3,4,5,6',
            gameId: game.id,
          },
          {
            item: '1,2,3,4,5,6',
            gameId: game.id,
          },
        ],
      })
      .expect(201)
  }).timeout(1000 * 30)
})
