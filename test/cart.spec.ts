import test from 'japa'
import supertest from 'supertest'

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Cart', () => {
  test('It must be possible to register a new cart', async () => {
    await supertest(baseUrl).post('/cart').send({ minValue: 5 }).expect(201)
  })
})
