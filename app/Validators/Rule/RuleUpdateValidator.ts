import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessageValidator } from '../CustomMessageValidator'

export class RuleUpdateValidator extends CustomMessageValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [
        rules.uuid(),
        rules.exists({ table: 'rules', column: 'id' }),
      ]),
    }),

    level: schema.string.optional({ trim: true }, [
      rules.unique({ table: 'rules', column: 'level' }),
      rules.minLength(3),
      rules.maxLength(15),
      rules.regex(/^[a-z]+$/gm),
      rules.notIn(['adm']),
    ]),
  })
}
