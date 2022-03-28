import test from 'japa'
import supertest from 'supertest'

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User', () => {
  test('It must be possible to register a new user', async () => {
    await supertest(baseUrl)
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
    await supertest(baseUrl)
      .post('/user/login')
      .send({
        email: 'devprimeiro@outlook.com',
        password: '11aaAA',
      })
      .expect(201)
  })
})
