import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserRuleDestroyValidator } from 'App/Validators/UserRule/UserRuleDestroyValidator'
import { UserRuleStoreValidator } from 'App/Validators/UserRule/UserStoreValidator'

export default class UsersRulesController {
  public async store({ request, response }: HttpContextContract) {
    await request.validate(UserRuleStoreValidator)

    const { userId, ruleId } = request.all()

    const user = await User.findOrFail(userId)
    await user.related('rules').attach(ruleId.split(','))

    return response.status(205).json({ message: 'Nível de acesso adicionado ao usuário' })
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    await request.validate(UserRuleDestroyValidator)

    const { ruleId } = request.all()

    const user = await User.findOrFail(params.id)

    await user.related('rules').detach(ruleId.split(','))

    return response.status(205).json({ message: 'Nível de acesso removido do usuário' })
  }
}
