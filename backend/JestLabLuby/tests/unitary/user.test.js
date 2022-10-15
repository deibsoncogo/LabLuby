const bcrypt = require('bcryptjs')
const truncate = require('../utils/truncate')
const { User } = require('../../src/models')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('Should encrypt user password', async () => {
    const user = await User.create({
      name: 'Usuário Primeiro Teste',
      email: 'devprimeiro@outlook.com',
      password: '11aaAA',
    })

    expect(await bcrypt.compare('11aaAA', user.password)).toBe(true)
  })
})
