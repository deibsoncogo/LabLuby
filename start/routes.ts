import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'Hello world' }
})

Route.group(() => {
  Route.resource('/user', 'UsersController').apiOnly()
})
