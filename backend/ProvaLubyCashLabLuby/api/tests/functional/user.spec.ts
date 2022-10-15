import { test } from '@japa/runner'
import { tokenAdminTest, tokenTest } from './auth.spec'

let userId: string

test.group('User - Store', () => {
  test('It must be possible to create a user', async ({ client }) => {
    const response = await client.post('/user').form({
      fullName: 'Usuário Primeiro',
      email: 'devprimeiro@outlook.com',
      password: '11aaAA',
    })

    userId = response.body().user.id

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

test.group('User - Index', () => {
  test('It must be possible to read all users by an administrator', async ({ client }) => {
    const response = await client.get('/user')
      .headers({ Authorization: `Bearer ${tokenAdminTest}` })

    response.assertStatus(200)
    response.assertTextIncludes('id')
  })

  test('It must not be possible to list all users by a non-admin', async ({ client }) => {
    const response = await client.get('/user')
      .headers({ Authorization: `Bearer ${tokenTest}` })

    response.assertStatus(403)
    response.assertTextIncludes('error')
  })
})

test.group('User - Show', () => {
  test('It must be possible to read a user', async ({ client }) => {
    const response = await client.get(`/user/${userId}`)
      .headers({ Authorization: `Bearer ${tokenTest}` })

    response.assertStatus(200)
    response.assertTextIncludes('user')
  })
})

test.group('User - Update', () => {
  test('It must be possible to update a user', async ({ client }) => {
    const response = await client.put(`/user/${userId}`)
      .form({
        fullName: 'Usuário Primeiro Alterado',
        email: 'devprimeiro@outlook.com.br',
        passwordOld: '11aaAA',
        passwordNew: '33ccCC',
      })
      .headers({ Authorization: `Bearer ${tokenTest}` })

    response.assertStatus(201)
    response.assertTextIncludes('Usuário Primeiro Alterado')
  })
})

test.group('User - Destroy', () => {
  test('It must be possible to delete a user', async ({ client }) => {
    const response = await client.delete(`/user/${userId}`)
      .headers({ Authorization: `Bearer ${tokenTest}` })

    response.assertStatus(205)
    response.assertTextIncludes('Usuário excluído')
  })
})
