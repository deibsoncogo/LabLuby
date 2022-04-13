import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessageValidator } from './CustomMessageValidator'

export class StoreUserRuleValidator extends CustomMessageValidator {
  constructor (protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    userId: schema.string({ trim: true }, [
      rules.uuid(),
      rules.exists({ table: 'users', column: 'id' }),
      rules.uniqueForeignKeyUser('rules', 'ruleId'),
    ]),

    ruleId: schema.string({ trim: true }, [
      rules.uuid(),
      rules.exists({ table: 'rules', column: 'id' }),
    ]),
  })
}

export class DestroyUserRuleValidator extends CustomMessageValidator {
  constructor (protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [
        rules.uuid(),
        rules.exists({ table: 'users', column: 'id' }),
      ]),
    }),

    ruleId: schema.string({ trim: true }, [
      rules.uuid(),
      rules.exists({ table: 'rules', column: 'id' }),
    ]),
  })
}
