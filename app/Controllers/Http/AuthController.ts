import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async store({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      const user = await User.findByOrFail('email', email)

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '6hours',
        name: user?.serialize().email,
      })

      const rules = await user.related('rules').query()

      return { token, user: user?.serialize(), rules }
    } catch (error) {
      return response.status(401).json({ error: 'Credencial inválida' })
    }
  }
}
