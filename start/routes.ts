import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'Hello world' }
})

Route.group(() => {
  Route.resource('/user', 'UsersController').apiOnly()
})

Route.group(() => {
  Route.resource('/rule', 'RulesController').apiOnly()
})

Route.group(() => {
  Route.resource('/user/rule', 'UsersRulesController').apiOnly().only(['store', 'destroy'])
})

Route.group(() => {
  Route.resource('/cart', 'CartsController').apiOnly()
})

Route.group(() => {
  Route.resource('/game', 'GamesController').apiOnly()
})

Route.group(() => {
  Route.resource('/bet', 'BetsController').apiOnly()
})
