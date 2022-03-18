import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessageValidator } from '../CustomMessageValidator'

export class UserRuleStoreValidator extends CustomMessageValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    userId: schema.string({ trim: true }, [
      rules.uuid(),
      rules.exists({ table: 'users', column: 'id' }),
    ]),

    ruleId: schema.string({ trim: true }, [rules.stringArray('uuid', 1, 10, true)]),
  })
}
