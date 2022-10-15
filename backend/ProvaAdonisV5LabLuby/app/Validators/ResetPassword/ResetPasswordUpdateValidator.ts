import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessageValidator } from '../CustomMessageValidator'

export class ResetPasswordUpdateValidator extends CustomMessageValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    password: schema.string.optional({ trim: true }, [
      rules.minLength(6),
      rules.maxLength(20),
      rules.regex(/([0-9]{2,})([a-z]{2,})([A-Z]{2,})/gm),
    ]),
  })
}
