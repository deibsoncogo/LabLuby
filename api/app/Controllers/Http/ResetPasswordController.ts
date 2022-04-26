import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { MicroServiceProducerUtils } from 'App/Utils/MicroServiceProducer'

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

    const messageEmail = {
      type: 'resetPassword',
      subject: 'Nova senha',
      email: user.email,
      name: user.fullName,
      url: `https://provaadonisv5labluby.com/resetPassword/${token.token}`,
    }

    await MicroServiceProducerUtils({type: 'resetPassword', data: messageEmail})

    return response.status(201).json({ message })
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
