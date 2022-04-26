import { test } from '@japa/runner'

let token: string
export let tokenTest: string
export let tokenAdminTest: string

test.group('Auth - Store', async () => {
  test('It must be possible to authenticate a user', async ({ client }) => {
    const response = await client.post('/section').form({
      email: 'admin@outlook.com',
      password: 'admin',
    })

    token = response.body().token.token

    response.assertStatus(201)
    response.assertTextIncludes('token')
  })

  test('It should not be possible to authenticate a user', async ({ client }) => {
    const response = await client.post('/section').form({
      email: 'admin@outlook.com',
      password: '11erRO',
    })

    response.assertStatus(401)
    response.assertTextIncludes('Credencial inválida')
  })
})

test.group('Auth - Destroy', () => {
  test('It should be possible to remove authentication from a user', async ({ client }) => {
    const response = await client.delete('/section')
      .headers({ Authorization: `Bearer ${token}` })

    response.assertStatus(205)
    response.assertTextIncludes('Token revogado')
  })
})

test.group('Auth - Authentications to be used in other tests', () => {
  test('It must be possible to authenticate a user', async ({ client }) => {
    const response = await client.post('/section').form({
      email: 'test@test.com',
      password: '12teST',
    })

    tokenTest = response.body().token.token

    response.assertStatus(201)
    response.assertTextIncludes('token')
  })

  test('It must be possible to authenticate a admin user', async ({ client }) => {
    const response = await client.post('/section').form({
      email: 'admin@outlook.com',
      password: 'admin',
    })

    tokenAdminTest = response.body().token.token

    response.assertStatus(201)
    response.assertTextIncludes('token')
  })
})

