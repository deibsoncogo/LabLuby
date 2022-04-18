import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'Hello world da API' }
})

Route.group(() => {
  Route.post('/user', 'UsersController.store')
  Route.post('/section', 'AuthsController.store')
  Route.post('/resetPassword', 'ResetPasswordController.store')
})

Route.group(() => {
  Route.group(() => {
    Route.resource('/user', 'UsersController').only(['show', 'update', 'destroy'])
    Route.delete('/section', 'AuthsController.destroy')
    Route.patch('/resetPassword', 'ResetPasswordController.update')
    Route.resource('/client', 'ClientsController').apiOnly()
  }).middleware(['authUser'])

  Route.group(() => {
    Route.get('/user', 'UsersController.index')
    Route.resource('/rule', 'RulesController').apiOnly()
    Route.resource('/userRule', 'UsersRulesController').only(['store', 'destroy'])
  }).middleware(['authAdmin'])
}).middleware(['auth'])
