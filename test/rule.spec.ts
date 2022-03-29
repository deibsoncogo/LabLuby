import Rule from 'App/Models/Rule'
import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'

let user: User, token
const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Access level (Rule)', (group) => {
  group.before(async () => {
    const rule = new Rule()
    rule.level = 'play'
    await rule.save()

    const responseUser = await supertest(baseUrl)
      .post('/user')
      .send({
        name: 'Usuário Primeiro',
        email: 'devprimeiro@outlook.com',
        password: '11aaAA',
      })
      .expect(201)

    user = responseUser.body.user

    const responseToken = await supertest(baseUrl)
      .post('/user/login')
      .send({
        email: 'devprimeiro@outlook.com',
        password: '11aaAA',
      })
      .expect(201)

    token = responseToken.body.token
  })

  test('It must be possible to create a valid access level (Rule)', async () => {
    await supertest(baseUrl)
      .post('/rule')
      .set({ Authorization: `Bearer ${token.token}` })
      .send({
        level: 'admin',
      })
      .expect(201)
  })
})
