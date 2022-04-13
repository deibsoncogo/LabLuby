import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'Hello world da API' }
})

Route.group(() => {
  Route.resource('/user', 'UsersController').apiOnly()
  Route.resource('/rule', 'RulesController').apiOnly()
  Route.resource('/userRule', 'UsersRulesController').only(['store', 'destroy'])
  Route.post('/section', 'AuthsController.store')
  Route.delete('/section', 'AuthsController.destroy').middleware(['auth'])
})
