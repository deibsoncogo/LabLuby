import test from 'japa'
import supertest from 'supertest'

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`

let user, token, game

test.group('User', () => {
  test('It must be possible to register a new user', async () => {
    user = await supertest(baseUrl)
      .post('/user')
      .send({
        name: 'Usuário Primeiro',
        email: 'devprimeiro@outlook.com',
        password: '11aaAA',
      })
      .expect(201)
  })

  test('It should not be possible to use an invalid name', async () => {
    await supertest(baseUrl)
      .post('/user')
      .send({
        name: 'Usuário Primeiro 1',
        email: 'devprimeiro1@outlook.com',
        password: '11aaAA',
      })
      .expect((log) => {
        return log.text.includes('name')
      })
  })

  test('It should not be possible to register an existing email', async () => {
    await supertest(baseUrl)
      .post('/user')
      .send({
        name: 'Usuário Primeiro',
        email: 'devprimeiro@outlook.com',
        password: '11aaAA',
      })
      .expect((log) => {
        return log.text.includes('email')
      })
  })

  test('It should not be possible to use a weak password', async () => {
    await supertest(baseUrl)
      .post('/user')
      .send({
        name: 'Usuário Primeiro',
        email: 'devprimeiro3@outlook.com',
        password: '112233',
      })
      .expect((log) => {
        return log.text.includes('password')
      })
  })
})

test.group('Authenticate', () => {
  test('It must be possible to create a valid authentication', async () => {
    token = await supertest(baseUrl)
      .post('/user/login')
      .send({
        email: 'devprimeiro@outlook.com',
        password: '11aaAA',
      })
      .expect(201)
  })
})

test.group('Game', () => {
  test('It should be possible to list all games', async () => {
    await supertest(baseUrl)
      .get('/game')
      .set({ Authorization: `Bearer ${token.body.token.token}` })
      .expect(200)
  })

  test('It should be possible to create a game', async () => {
    game = await supertest(baseUrl)
      .post('/game')
      .set({ Authorization: `Bearer ${token.body.token.token}` })
      .send({
        type: 'Tipo Primeiro',
        description: 'Descrição Primeiro',
        range: 60,
        price: 3.5,
        maxNumber: 6,
        color: '#ABCDEF',
      })
      .expect(201)
  })

  test('It should be possible to list a game', async () => {
    await supertest(baseUrl)
      .get(`/game/${game.body.id}`)
      .set({ Authorization: `Bearer ${token.body.token.token}` })
      .expect(200)
  })

  test('It should be possible to edit a game', async () => {
    await supertest(baseUrl)
      .put(`/game/${game.body.id}`)
      .set({ Authorization: `Bearer ${token.body.token.token}` })
      .send({ type: 'Tipo Primeiro Alterado' })
      .expect(201)
  })

  test('It should be possible to delete a game', async () => {
    await supertest(baseUrl)
      .delete(`/game/${game.body.id}`)
      .set({ Authorization: `Bearer ${token.body.token.token}` })
      .expect(204)
  })
})
