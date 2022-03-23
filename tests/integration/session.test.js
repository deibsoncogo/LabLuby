const { User } = require('../../src/models')

describe('Authentication', () => {
  it('Should sum two numbers', () => {
    const x = 2, y = 4
    const sum = x + y

    expect(sum).toBe(6)
  })
})

describe('User', () => {
  it('Must be possible to create a user', async () => {
    const user = await User.create({
      name: 'Usuário Teste',
      email: 'devprimeiro@outlook.com',
      password: '11aaAA',
    })

    expect(user.email).toBe('devprimeiro@outlook.com')
  })
})
