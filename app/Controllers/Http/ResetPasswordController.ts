import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import { ResetPasswordUpdateValidator } from 'App/Validators/ResetPassword/ResetPasswordUpdateValidator'
import { ResetPasswordStoreValidator } from 'App/Validators/ResetPassword/ResetPasswordStoreValidator'

export default class ResetPasswordController {
  public async store({ auth, request, response }: HttpContextContract) {
    await request.validate(ResetPasswordStoreValidator)

    const { email } = request.all()

    const user = await User.findBy('email', email)

    if (!user) {
      return response.status(401).json({ message: 'Não existe este e-mail registrado' })
    }

    const token = await auth.use('api').generate(user, {
      expiresIn: '1days',
      name: 'Reset password to user',
    })

    await Mail.send((message) => {
      message
        .from('contact@teste.com', 'Prova Adonis V5 LabLuby')
        .replyTo('noreply@teste.com', 'Prova Adonis V5 LabLuby')
        .to(user.email)
        .subject('Nova senha')
        .htmlView('emails/reset_password', {
          name: user.name,
          url: `https://provaadonisv5labluby.com/resetPassword/${token.token}`,
        })
    })

    return response.status(201).json(token)
  }

  public async update({ auth, request, response }: HttpContextContract) {
    await request.validate(ResetPasswordUpdateValidator)

    const { password } = request.all()

    const user = await User.findOrFail(auth.user?.id)

    user.password = password
    await user.save()

    return response.status(201).json({ message: 'Senha alterada com sucesso' })
  }
}
