import test from 'japa'
import supertest from 'supertest'
import User from 'App/Models/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Example', () => {
  test('assert sum', (assert) => {
    assert.equal(2 + 2, 4)
  })
})

test.group('Welcome', () => {
  test('ensure home page works', async () => {
    await supertest(BASE_URL).get('/').expect(200)
  })

  test('ensure user password gets hashed during save', async (assert) => {
    const user = new User()
    user.name = 'Virk Adonis JS'
    user.email = 'virk@adonisjs.com'
    user.password = 'secret'
    await user.save()

    assert.notEqual(user.password, 'secret')
  })
})
