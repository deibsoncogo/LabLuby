// import { test } from '@japa/runner'
// import User from 'App/Models/User'
// import { tokenTest } from './auth.spec'

// test.group('Client - Store', async () => {
//   const user = await User.findByOrFail('fullName', 'Usuário Terceiro')

//   test('It must be possible to create a client', async ({ client }) => {
//     const response = await client.post('/client')
//       .headers({ Authorization: `Bearer ${tokenTest}`})
//       .form({
//         userId: user.id,
//         cpf: 11122233344,
//         phone: 16999887766,
//         address: 'Rua Teste 1',
//         city: 'Cidade Teste 1',
//         state: 'Estado Teste 1',
//         zipCode: 14900000,
//         averageSalary: 300,
//       })

//     response.assertStatus(201)
//     response.assertTextIncludes('id')
//   })
// })
