import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rule from 'App/Models/Rule'
import User from 'App/Models/User'
import { DestroyUserRuleValidator, StoreUserRuleValidator } from 'App/Validators/UserRuleValidator'

export default class UsersRulesController {
  public async store ({ request, response }: HttpContextContract) {
    await request.validate(StoreUserRuleValidator)

    const data = request.only(['userId', 'ruleId'])

    const user = await User.findOrFail(data.userId)
    const rule = await Rule.findOrFail(data.ruleId)

    await user.related('rules').attach([data.ruleId])

    return response.status(205).json({ user, rule })
  }

  public async destroy ({ params, request, response }: HttpContextContract) {
    await request.validate(DestroyUserRuleValidator)

    const data = request.only(['ruleId'])

    const user = await User.findOrFail(params.id)

    await user.related('rules').detach([data.ruleId])

    return response.status(205).json({ message: 'Regra removida do usuário' })
  }
}
