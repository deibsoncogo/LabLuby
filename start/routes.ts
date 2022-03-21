import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'Hello world' }
})

Route.group(() => {
  Route.post('/user', 'UsersController.store')
  Route.post('/user/login', 'AuthController.store')
})

Route.group(() => {
  Route.resource('/user', 'UsersController').apiOnly().except(['store', 'destroy'])
  Route.resource('/rule', 'RulesController').apiOnly().except(['destroy'])
  Route.resource('/user/rule', 'UsersRulesController').apiOnly().only(['store'])
  Route.resource('/cart', 'CartsController').apiOnly().except(['destroy'])
  Route.resource('/game', 'GamesController').apiOnly().except(['destroy'])
  Route.resource('/bet', 'BetsController').apiOnly().except(['destroy'])
}).middleware('auth')

Route.group(() => {
  Route.resource('/user', 'UsersController').apiOnly().only(['destroy'])
  Route.resource('/rule', 'RulesController').apiOnly().only(['destroy'])
  Route.resource('/user/rule', 'UsersRulesController').apiOnly().only(['destroy'])
  Route.resource('/cart', 'CartsController').apiOnly().only(['destroy'])
  Route.resource('/game', 'GamesController').apiOnly().only(['destroy'])
  Route.resource('/bet', 'BetsController').apiOnly().only(['destroy'])
}).middleware(['auth', 'ruleLevelAdmin'])
