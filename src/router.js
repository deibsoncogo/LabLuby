const routes = require('express').Router()
const SessionController = require('./controllers/sessionController')
const authMiddleware = require('./middlewares/auth')

routes.post('/session', SessionController.store)

routes.use(authMiddleware)

routes.get('/dashboard', (request, response) => {
  return response.status(200).json({})
})

module.exports = routes
