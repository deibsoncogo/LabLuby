import test from 'japa'
import supertest from 'supertest'

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Rule', () => {
  test('It must be possible to register a new rule', async () => {
    await supertest(baseUrl)
      .post('/rule')
      .send({
        level: 'admin',
      })
      .expect(201)
  })

  test('It should not be possible to use an invalid rule', async () => {
    await supertest(baseUrl)
      .post('/user')
      .send({
        level: 'admin55',
      })
      .expect((log) => {
        return log.text.includes('level')
      })
  })
})
