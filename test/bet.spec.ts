import test from 'japa'
import supertest from 'supertest'
import User from 'App/Models/User'
import Game from 'App/Models/Game'

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`

let user: User, game: Game

test.group('Bet', (group) => {
  group.before(async () => {
    const responseUser = await supertest(baseUrl)
      .post('/user')
      .send({
        name: 'Usuário Segundo Bet',
        email: 'devsegundo@outlook.com',
        password: '22bbBB',
      })
      .expect(201)

    user = responseUser.body

    const responseGame = await supertest(baseUrl)
      .post('/game')
      .send({
        type: 'Tipo Primeiro Bet',
        description: 'Descrição Primeiro Bet',
        range: 20,
        price: 3,
        maxNumber: 6,
        color: '#ABCDEF',
      })
      .expect(201)

    game = responseGame.body
  })

  test('It must be possible to register a new game', async () => {
    await supertest(baseUrl)
      .post('/bet')
      .send({
        valueCart: 7,
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
  })
})
