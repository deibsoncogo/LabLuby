import { test } from '@japa/runner'
import { tokenAdminTest, tokenTest } from './auth.spec'

let ruleId: string

test.group('Rule - Store', () => {
  test('It must be possible to create a rule', async ({ client }) => {
    const response = await client.post('/rule')
      .form({ name: 'test' })
      .headers({ Authorization: `Bearer ${tokenAdminTest}` })

    ruleId = response.body().id

    response.assertStatus(201)
    response.assertTextIncludes('id')
  })

  test('It should not be possible for an unauthorized user to access', async ({ client }) => {
    const response = await client.post('/rule')
      .form({ name: 'test' })
      .headers({ Authorization: `Bearer ${tokenTest}` })

    response.assertStatus(403)
    response.assertTextIncludes('admin')
  })

  test('It should not be possible to create a rule with the invalid name', async ({ client }) => {
    const response = await client.post('/rule')
      .form({ name: 'Admin Super'})
      .headers({ Authorization: `Bearer ${tokenAdminTest}` })

    response.assertStatus(422)
    response.assertTextIncludes('name')
  })
})

test.group('Rule - Index', () => {
  test('It should be possible to read all rules', async ({ client }) => {
    const response = await client.get('/rule')
      .headers({ Authorization: `Bearer ${tokenAdminTest}`})

    response.assertStatus(200)
    response.assertTextIncludes('id')
  })

  test('It should not be possible for an unauthorized user to access', async ({ client }) => {
    const response = await client.get('/rule')
      .headers({ Authorization: `Bearer ${tokenTest}`})

    response.assertStatus(403)
    response.assertTextIncludes('admin')
  })
})

test.group('Rule - Show', () => {
  test('It must be possible to read a rule', async ({ client }) => {
    const response = await client.get(`/rule/${ruleId}`)
      .headers({ Authorization: `Bearer ${tokenAdminTest}`})

    response.assertStatus(200)
    response.assertTextIncludes('id')
  })

  test('It should not be possible for an unauthorized user to access', async ({ client }) => {
    const response = await client.get(`/rule/${ruleId}`)
      .headers({ Authorization: `Bearer ${tokenTest}`})

    response.assertStatus(403)
    response.assertTextIncludes('admin')
  })
})

test.group('Rule - Update', () => {
  test('It must be possible to update a rule', async ({ client }) => {
    const response = await client.put(`/rule/${ruleId}`)
      .headers({ Authorization: `Bearer ${tokenAdminTest}`})

    response.assertStatus(201)
    response.assertTextIncludes('id')
  })

  test('It should not be possible for an unauthorized user to access', async ({ client }) => {
    const response = await client.put(`/rule/${ruleId}`)
      .headers({ Authorization: `Bearer ${tokenTest}`})

    response.assertStatus(403)
    response.assertTextIncludes('admin')
  })
})

test.group('Rule - Destroy', () => {
  test('It must be possible to destroy a rule', async ({ client }) => {
    const response = await client.delete(`/rule/${ruleId}`)
      .headers({ Authorization: `Bearer ${tokenAdminTest}`})

    response.assertStatus(205)
    response.assertTextIncludes('Regra excluída')
  })

  test('It should not be possible for an unauthorized user to access', async ({ client }) => {
    const response = await client.delete(`/rule/${ruleId}`)
      .headers({ Authorization: `Bearer ${tokenTest}`})

    response.assertStatus(403)
    response.assertTextIncludes('admin')
  })
})
