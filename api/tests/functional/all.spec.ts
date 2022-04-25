import { test } from '@japa/runner'

let user; let token

test.group('Users - Store', () => {
  test('It must be possible to create a user', async ({ client }) => {
    const response = await client.post('/user').form({
      fullName: 'Usuário Primeiro',
      email: 'devprimeiro@outlook.com',
      password: '11aaAA',
    })

    user = response.body()

    response.assertStatus(201)
    response.assertTextIncludes('id')
  })

  test('It should not be possible to create a user with an invalid name', async ({ client }) => {
    const response = await client.post('/user').form({
      fullName: 'Usuário Primeiro 1',
      email: 'devprimeiro@outlook.com',
      password: '11aaAA',
    })

    response.assertStatus(422)
    response.assertTextIncludes('fullName')
  })

  test('It should not be possible to create a user with an invalid email', async ({ client }) => {
    const response = await client.post('/user').form({
      fullName: 'Usuário Primeiro',
      email: 'devPrimeiro@outlook',
      password: '11aaAA',
    })

    response.assertStatus(422)
    response.assertTextIncludes('email')
  })

  test('It should not be possible to create a user with an duplicate email', async ({ client }) => {
    const response = await client.post('/user').form({
      fullName: 'Usuário Segundo',
      email: 'devprimeiro@outlook.com',
      password: '22bbBB',
    })

    response.assertStatus(422)
    response.assertTextIncludes('email')
  })

  test('It should not be possible to create a user with an invalid password', async ({ client }) => {
    const response = await client.post('/user').form({
      fullName: 'Usuário Primeiro',
      email: 'devprimeiro@outlook.com',
      password: '123456',
    })

    response.assertStatus(422)
    response.assertTextIncludes('password')
  })
})

test.group('Auths - Store', () => {
  test('It must be possible to authenticate a user', async ({ client }) => {
    const response = await client.post('/section').form({
      email: 'devprimeiro@outlook.com',
      password: '11aaAA',
    })

    token = response.body()

    response.assertStatus(201)
    response.assertTextIncludes('token')
  })

  test('It should not be possible to authenticate a user', async ({ client }) => {
    const response = await client.post('/section').form({
      email: 'devprimeiro@outlook.com',
      password: '85ujAB',
    })

    response.assertStatus(401)
    response.assertTextIncludes('error')
  })
})

test.group('Auths - Delete', () => {
  test('It should be possible to remove authentication from a user', async ({ client }) => {
    const response = await client.delete('/section')
      .headers({ Authorization: `Bearer ${token.token.token}` })

    response.assertStatus(205)
    response.assertTextIncludes('Token revogado')
  })
})
