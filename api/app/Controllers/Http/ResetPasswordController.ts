import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class ResetPasswordController {
  public async store ({ auth, request, response }: HttpContextContract) {
    const data = request.only(['email'])

    const user = await User.findByOrFail('email', data.email)

    const message = 'Iremos enviar um e-mail caso ele seja válido'

    if (!user) {
      return response.status(401).json(message)
    }

    const token = await auth.use('api').generate(user, {
      expiresIn: '40mins',
      name: 'Reset password to user',
    })

    // implementar envio do e-mail

    return response.status(201).json({ message, token })
  }

  public async update ({ auth, request, response }: HttpContextContract) {
    const { password } = request.all()

    const user = await User.findOrFail(auth.user?.id)

    await auth.use('api').revoke()

    user.password = password

    await user.save()

    return response.status(201).json({ message: 'Senha alterada' })
  }
}
