import test from 'japa'
import supertest from 'supertest'
import Rule from 'App/Models/Rule'
import User from 'App/Models/User'
import Game from 'App/Models/Game'

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Game', (group) => {
  let rulePlay: Rule, ruleAdmin: Rule, user: User, token: any, game: Game

  group.before(async () => {
    rulePlay = new Rule()
    rulePlay.level = 'play'
    await rulePlay.save()

    ruleAdmin = new Rule()
    ruleAdmin.level = 'admin'
    await ruleAdmin.save()

    user = new User()
    user.name = 'Usuário Segundo Teste'
    user.email = 'devsegundo@outlook.com'
    user.password = '22bbBB'
    await user.save()

    await user.related('rules').attach([rulePlay.id, ruleAdmin.id])

    const responseToken = await supertest(baseUrl)
      .post('/user/login')
      .send({
        email: 'devsegundo@outlook.com',
        password: '22bbBB',
      })
      .expect(201)

    token = responseToken.body.token
  })

  group.after(async () => {
    await user.delete()
    await ruleAdmin.delete()
    await rulePlay.delete()
  })

  test('It should be possible to list all games', async () => {
    await supertest(baseUrl)
      .get('/game')
      .set({ Authorization: `Bearer ${token.token}` })
      .expect(200)
  })

  test('It should be possible to create a game', async () => {
    const { body } = await supertest(baseUrl)
      .post('/game')
      .set({ Authorization: `Bearer ${token.token}` })
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
    await supertest(baseUrl)
      .get(`/game/${game.id}`)
      .set({ Authorization: `Bearer ${token.token}` })
      .expect(200)
  })

  test('It should be possible to edit a game', async () => {
    await supertest(baseUrl)
      .put(`/game/${game.id}`)
      .set({ Authorization: `Bearer ${token.token}` })
      .send({ type: 'Tipo Primeiro Alterado' })
      .expect(201)
  })

  test('It should be possible to delete a game', async () => {
    await supertest(baseUrl)
      .delete(`/game/${game.id}`)
      .set({ Authorization: `Bearer ${token.token}` })
      .expect(204)
  })
})
