import Rule from 'App/Models/Rule'
import test from 'japa'
import supertest from 'supertest'

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User', (group) => {
  group.before(async () => {
    const rule = new Rule()
    rule.level = 'play'
    await rule.save()
  })

  test('It must be possible to register a new user', async () => {
    await supertest(baseUrl)
      .post('/user')
      .send({
        name: 'Usuário Primeiro',
        email: 'devprimeiro@outlook.com',
        password: '11aaAA',
      })
      .expect(201)
  }).timeout(1000 * 30)

  test('It should not be possible to use an invalid name', async () => {
    await supertest(baseUrl)
      .post('/user')
      .send({
        name: 'Invalid Name 1',
        email: 'invalidName@outlook.com',
        password: '11aaAA',
      })
      .expect((log) => {
        return log.text.includes('name')
      })
  })

  test('It should not be possible to use an invalid email', async () => {
    await supertest(baseUrl)
      .post('/user')
      .send({
        name: 'Invalid Email',
        email: 'invalidEmail@outlook',
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
        name: 'Weak Password',
        email: 'weakpassword@outlook.com',
        password: '112233',
      })
      .expect((log) => {
        return log.text.includes('password')
      })
  })
})
