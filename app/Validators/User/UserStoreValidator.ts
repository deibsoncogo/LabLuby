import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessageValidator } from '../CustomMessageValidator'

export class UserStoreValidator extends CustomMessageValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(100),
      rules.regex(/^[a-zà-äè-ëì-ïò-öù-ü\s]+$/gim),
    ]),

    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),

    password: schema.string({ trim: true }, [
      rules.minLength(6),
      rules.maxLength(20),
      rules.regex(/([0-9]{2,})([a-z]{2,})([A-Z]{2,})/gm),
    ]),
  })
}
