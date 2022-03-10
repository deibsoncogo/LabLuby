import Route from '@ioc:Adonis/Core/Route'

Route.where('id', {
  match: /^\d+$/,
  cast: (id) => Number(id),
})

Route.group(() => {
  Route.resource('', 'UsersController').only(['store']).apiOnly()
  Route.post('/login', 'AuthController.login')
}).prefix('/user')

Route.group(() => {
  Route.resource('/user', 'UsersController').except(['store']).apiOnly()
}).middleware('auth')
