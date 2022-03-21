import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RuleLevelAdmin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const rules = await auth.user?.related('rules').query()

    let isAuthorized = false

    rules?.forEach((rule) => {
      if (rule.level === 'admin') isAuthorized = true
    })

    if (isAuthorized) return next()

    return response.status(404).json({ message: 'O usuário não é autorizado' })
  }
}
