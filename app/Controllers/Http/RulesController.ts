import Rule from 'App/Models/Rule'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RuleIdValidator } from 'App/Validators/Rule/RuleIdValidator'
import { RuleStoreValidator } from 'App/Validators/Rule/RuleStoreValidator'
import { RuleUpdateValidator } from 'App/Validators/Rule/RuleUpdateValidator'

export default class RulesController {
  public async index({ response }: HttpContextContract) {
    const rules = await Rule.query().orderBy('createdAt', 'asc')

    return response.status(200).json(rules)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(RuleStoreValidator)

    const { level } = request.all()

    const rule = await Rule.create({ level })

    return response.status(201).json(rule)
  }

  public async show({ params, request, response }: HttpContextContract) {
    await request.validate(RuleIdValidator)

    const rule = await Rule.findOrFail(params.id)
    const users = await rule.related('users').query()

    return response.status(200).json({ rule, users })
  }

  public async update({ params, request, response }: HttpContextContract) {
    await request.validate(RuleUpdateValidator)

    const { level } = request.all()

    const rule = await Rule.findOrFail(params.id)

    await rule.merge({ level }).save()

    return response.status(201).json(rule)
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    await request.validate(RuleIdValidator)

    const rule = await Rule.findOrFail(params.id)

    await rule.delete()

    return response.status(204)
  }
}
