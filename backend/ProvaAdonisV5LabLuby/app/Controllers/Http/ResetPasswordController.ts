import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { ResetPasswordUpdateValidator } from 'App/Validators/ResetPassword/ResetPasswordUpdateValidator'
import { ResetPasswordStoreValidator } from 'App/Validators/ResetPassword/ResetPasswordStoreValidator'

export default class ResetPasswordController {
  public async store({ auth, request, response }: HttpContextContract) {
    await request.validate(ResetPasswordStoreValidator)

    const { email } = request.all()

    const user = await User.findBy('email', email)

    if (!user) {
      return response.status(401).json({
        message: 'Iremos enviar um e-mail para realizar a alteração da senha caso ele seja válido',
      })
    }

    const token = await auth.use('api').generate(user, {
      expiresIn: '40mins',
      name: 'Reset password to user',
    })

    const message = {
      type: 'resetPassword',
      subject: 'Nova senha',
      email,
      name: user.name,
      url: `https://provaadonisv5labluby.com/resetPassword/${token.token}`,
    }

    await request.producer.send({
      topic: 'MicroServiceEmail',
      messages: [{ value: JSON.stringify(message) }],
    })

    return response.status(201).json({
      message: 'Iremos enviar um e-mail para realizar a alteração da senha caso ele seja válido',
    })
  }

  public async update({ auth, request, response }: HttpContextContract) {
    await request.validate(ResetPasswordUpdateValidator)

    const { password } = request.all()

    const user = await User.findOrFail(auth.user?.id)

    await auth.use('api').revoke()

    user.password = password
    await user.save()

    return response.status(201).json({ message: 'Senha alterada com sucesso' })
  }
}
