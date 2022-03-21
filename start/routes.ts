import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'Hello world' }
})

Route.group(() => {
  Route.post('/user', 'UsersController.store')
  Route.post('/user/login', 'AuthController.store')
})

Route.group(() => {
  Route.resource('/user', 'UsersController').apiOnly().except(['store'])
  Route.resource('/rule', 'RulesController').apiOnly()
  Route.resource('/user/rule', 'UsersRulesController').apiOnly().only(['store', 'destroy'])
  Route.resource('/cart', 'CartsController').apiOnly()
  Route.resource('/game', 'GamesController').apiOnly()
  Route.resource('/bet', 'BetsController').apiOnly()
}).middleware('auth')
