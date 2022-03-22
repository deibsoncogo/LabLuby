const routes = require('express').Router()
const { User } = require('./models')

User.create({
  name: 'Usuário Primeiro',
  email: 'devprimeiro@outlook.com',
  password: '11aaAA',
})

module.exports = routes
