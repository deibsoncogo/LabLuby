import { test } from '@japa/runner'

let user; let token; let tokenAdmin

test.group('Users - Store one', () => {
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

test.group('Auths - Store one', () => {
  test('It must be possible to authenticate a user', async ({ client }) => {
    const response = await client.post('/section').form({
      email: 'devprimeiro@outlook.com',
      password: '11aaAA',
    })

    token = response.body()

    response.assertStatus(201)
    response.assertTextIncludes('token')
  })

  test('It must be possible to authenticate a user (Admin)', async ({ client }) => {
    const response = await client.post('/section').form({
      email: 'admin@outlook.com',
      password: 'admin',
    })

    tokenAdmin = response.body()

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

test.group('Users - Read one', () => {
  test('It must be possible to read a user', async ({ client }) => {
    const response = await client.get(`/user/${user.user.id}`)
      .headers({ Authorization: `Bearer ${token.token.token}` })

    response.assertStatus(200)
    response.assertTextIncludes('user')
  })
})

test.group('Users - Read all', () => {
  test('It must be possible to read all users by an administrator', async ({ client }) => {
    const response = await client.get('/user')
      .headers({ Authorization: `Bearer ${tokenAdmin.token.token}` })

    response.assertStatus(200)
    response.assertTextIncludes('id')
  })

  test('It must not be possible to list all users by a non-admin', async ({ client }) => {
    const response = await client.get('/user')
      .headers({ Authorization: `Bearer ${token.token.token}` })

    response.assertStatus(403)
    response.assertTextIncludes('error')
  })
})

test.group('Users - Update one', () => {
  test('It must be possible to update a user', async ({ client }) => {
    const response = await client.put(`/user/${user.user.id}`)
      .form({
        fullName: 'Usuário Primeiro Alterado',
        email: 'devprimeiro@outlook.com.br',
        passwordOld: '11aaAA',
        passwordNew: '33ccCC',
      })
      .headers({ Authorization: `Bearer ${token.token.token}` })

    response.assertStatus(201)
    response.assertTextIncludes('Usuário Primeiro Alterado')
  })
})

test.group('Users - Delete one', () => {
  test('It must be possible to delete a user', async ({ client }) => {
    const response = await client.delete(`/user/${user.user.id}`)
      .headers({ Authorization: `Bearer ${token.token.token}` })

    response.assertStatus(205)
    response.assertTextIncludes('Usuário excluído')
  })
})

test.group('Auths - Delete one', () => {
  test('It should be possible to remove authentication from a user', async ({ client }) => {
    const response = await client.delete('/section')
      .headers({ Authorization: `Bearer ${tokenAdmin.token.token}` })

    response.assertStatus(205)
    response.assertTextIncludes('Token revogado')
  })
})
