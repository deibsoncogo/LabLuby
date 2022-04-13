import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthsController {
  public async store ({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      const user = await User.findByOrFail('email', email)

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '6hours',
        name: user?.serialize().email,
      })

      const rules = await user.related('rules').query()

      return response.status(201).json({ token, user, rules })
    } catch (error) {
      return response.status(401).json({ error: 'Credencial inválida' })
    }
  }

  public async destroy ({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').revoke()

      return response.status(205).json({ message: 'Token revogado' })
    } catch (error) {
      return response.status(400).json({ message: 'Erro inesperado ao revogar o token' })
    }
  }
}
