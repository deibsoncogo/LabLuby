import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/', async () => {
  return { message: 'Hello world' }
})

Route.get('/userAll', async () => {
  return Database.from('users').select('*')
})

Route.post('/login', 'AuthController.login')
