import { test } from '@japa/runner'

test('Display welcome page function', async ({ client }) => {
  const response = await client.get('/')

  response.assertStatus(200)
  response.assertBodyContains({ 'message': 'Hello world da API' })
})
