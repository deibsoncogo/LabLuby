import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthAdminMiddleware {
  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const rules = await auth.user?.related('rules').query()

    const ruleName = 'admin'
    let isAuthorized = false

    rules?.forEach((rule) => {
      if (rule.name === ruleName) {
        isAuthorized = true
      }
    })

    if (isAuthorized) {
      return next()
    }

    return response.status(403).json({ error: `O usuário não possui o nível de acesso ${ruleName}` })
  }
}
