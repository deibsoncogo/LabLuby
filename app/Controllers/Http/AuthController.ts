import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async store({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.findByOrFail('email', email)

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '30mins',
        name: user?.serialize().email,
      })

      return { token, user: user?.serialize() }
    } catch (error) {
      return response.badRequest('Credenciais inválidas')
    }
  }
}
