import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessageValidator } from '../CustomMessageValidator'

export class UserUpdateValidator extends CustomMessageValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [
        rules.uuid(),
        rules.exists({ table: 'users', column: 'id' }),
      ]),
    }),

    name: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(100),
      rules.regex(/^[a-zà-äè-ëì-ïò-öù-ü\s]+$/gim),
    ]),

    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),

    password: schema.string.optional({ trim: true }, [
      rules.minLength(6),
      rules.maxLength(20),
      rules.regex(/([0-9]{2,})([a-z]{2,})([A-Z]{2,})/gm),
    ]),

    ruleId: schema.string.optional({ trim: true }, [rules.stringArray('uuid', 1, 10, true)]),
  })
}
