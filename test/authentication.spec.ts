import test from 'japa'
import supertest from 'supertest'
import Rule from 'App/Models/Rule'
import User from 'App/Models/User'

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Authentication', (group) => {
  let rule: Rule, user: User

  group.before(async () => {
    rule = new Rule()
    rule.level = 'play'
    await rule.save()

    user = new User()
    user.name = 'Usuário Segundo Teste'
    user.email = 'devsegundo@outlook.com'
    user.password = '22bbBB'
    await user.save()

    await user.related('rules').attach([rule.id])
  })

  group.after(async () => {
    await user.delete()
    await rule.delete()
  })

  test('It must be possible to perform a user authentication', async () => {
    await supertest(baseUrl)
      .post('/user/login')
      .send({
        email: 'devsegundo@outlook.com',
        password: '22bbBB',
      })
      .expect(201)
  })
})
