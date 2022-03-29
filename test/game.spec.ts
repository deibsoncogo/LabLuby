import test from 'japa'
import supertest from 'supertest'
import Game from 'App/Models/Game'

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`

let game: Game

test.group('Game', () => {
  test('It should be possible to list all games', async () => {
    await supertest(baseUrl).get('/game').expect(200)
  })

  test('It should be possible to create a game', async () => {
    const { body } = await supertest(baseUrl)
      .post('/game')
      .send({
        type: 'Tipo Primeiro',
        description: 'Descrição Primeiro',
        range: 60,
        price: 3.5,
        maxNumber: 6,
        color: '#ABCDEF',
      })
      .expect(201)

    game = body
  })

  test('It should be possible to list a game', async () => {
    await supertest(baseUrl).get(`/game/${game.id}`).expect(200)
  })

  test('It should be possible to edit a game', async () => {
    await supertest(baseUrl)
      .put(`/game/${game.id}`)
      .send({ type: 'Tipo Primeiro Alterado' })
      .expect(201)
  })

  test('It should be possible to delete a game', async () => {
    await supertest(baseUrl).delete(`/game/${game.id}`).expect(204)
  })
})
