import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessageValidator } from '../CustomMessageValidator'

export class RuleStoreValidator extends CustomMessageValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    level: schema.string({ trim: true }, [
      rules.unique({ table: 'rules', column: 'level' }),
      rules.minLength(3),
      rules.maxLength(15),
      rules.regex(/^[a-z]+$/gm),
      rules.notIn(['adm']),
    ]),
  })
}
