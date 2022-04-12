import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rule from 'App/Models/Rule'
import { IdRuleValidator, StoreRuleValidator, UpdateRuleValidator } from 'App/Validators/RuleValidator'

export default class RulesController {
  public async index ({ response }: HttpContextContract) {
    const rules = await Rule.query()

    return response.status(200).json(rules)
  }

  public async store ({ request, response }: HttpContextContract) {
    await request.validate(StoreRuleValidator)

    const data = request.only(['name'])

    const rule = await Rule.create(data)

    return response.status(201).json(rule)
  }

  public async show ({ params, request, response }: HttpContextContract) {
    await request.validate(IdRuleValidator)

    const rule = await Rule.findOrFail(params.id)

    return response.status(200).json(rule)
  }

  public async update ({ params, request, response }: HttpContextContract) {
    await request.validate(UpdateRuleValidator)

    const data = request.only(['name'])

    const rule = await Rule.findOrFail(params.id)

    await rule.merge(data).save()

    return response.status(201).json(rule)
  }

  public async destroy ({ params, request, response }: HttpContextContract) {
    await request.validate(IdRuleValidator)

    const rule = await Rule.findOrFail(params.id)

    await rule.delete()

    return response.status(205).json({ message: 'Regra excluída' })
  }
}
