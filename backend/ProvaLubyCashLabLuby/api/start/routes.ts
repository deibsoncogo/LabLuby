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
    Route.resource('/client', 'ClientsController').apiOnly().except(['index'])
    Route.patch('/revalidateStatusClient', 'RevalidateStatusClientController.update')
    Route.resource('/transaction', 'TransactionsController').only(['store'])
  }).middleware(['authUser'])

  Route.group(() => {
    Route.get('/user', 'UsersController.index')
    Route.resource('/rule', 'RulesController').apiOnly()
    Route.resource('/userRule', 'UsersRulesController').only(['store', 'destroy'])
    Route.resource('/client', 'ClientsController').only(['index'])
    Route.resource('/transaction', 'TransactionsController').only(['show'])
  }).middleware(['authAdmin'])
}).middleware(['auth'])
