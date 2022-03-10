import Route from '@ioc:Adonis/Core/Route'
import '../app/Modules/User/routers'

Route.any('/:name?', async ({ params }) => {
  if (params.name) {
    return { message: `Hello world, ${params.name}` }
  }

  return { message: 'Hello world' }
}).where('name', /^[a-z]|[A-Z]+$/)

Route.get('/coringa/*', async ({ params }) => {
  return { coringa: params['*'] }
})
