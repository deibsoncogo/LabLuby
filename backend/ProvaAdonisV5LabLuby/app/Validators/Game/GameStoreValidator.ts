import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessageValidator } from '../CustomMessageValidator'

export class GameStoreValidator extends CustomMessageValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    type: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(100),
      rules.unique({ table: 'games', column: 'type' }),
      rules.regex(/^[a-zà-äè-ëì-ïò-öù-ü\s]+$/gim),
    ]),

    description: schema.string({ trim: true }, [rules.minLength(10), rules.maxLength(200)]),

    range: schema.number([rules.unsigned(), rules.numberInteger()]),

    price: schema.number([rules.unsigned()]),

    maxNumber: schema.number([rules.unsigned(), rules.numberInteger()]),

    color: schema.string({ trim: true }, [rules.regex(/#[0-9a-f]{3,6}/gim)]),
  })
}
