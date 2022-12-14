import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MessagesValidator } from './Customs/Messages'

export class StoreUserValidator extends MessagesValidator {
  constructor (protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    fullName: schema.string([
      rules.trim(),
      rules.minLength(3),
      rules.maxLength(100),
      rules.regex(/^[a-zà-äè-ëì-ïò-öù-üç\s]+$/gi),
    ]),

    email: schema.string([
      rules.trim(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),

    password: schema.string([
      rules.trim(),
      rules.minLength(6),
      rules.maxLength(20),
      rules.regex(/([0-9]{2,})([a-z]{2,})([A-Z]{2,})/g),
    ]),
  })
}

export class UpdateUserValidator extends MessagesValidator {
  constructor (protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string([
        rules.trim(),
        rules.uuid(),
        rules.exists({ table: 'users', column: 'id' }),
      ]),
    }),

    fullName: schema.string.optional([
      rules.trim(),
      rules.minLength(3),
      rules.maxLength(100),
      rules.regex(/^[a-zà-äè-ëì-ïò-öù-ü\s]+$/gi),
    ]),

    email: schema.string.optional([
      rules.trim(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),

    passwordOld: schema.string.optional([
      rules.trim(),
      rules.minLength(6),
      rules.maxLength(20),
      rules.regex(/([0-9]{2,})([a-z]{2,})([A-Z]{2,})/g),
    ]),

    passwordNew: schema.string.optional([
      rules.trim(),
      rules.minLength(6),
      rules.maxLength(20),
      rules.regex(/([0-9]{2,})([a-z]{2,})([A-Z]{2,})/g),
    ]),
  })
}

export class IdUserValidator extends MessagesValidator {
  constructor (protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string([
        rules.trim(),
        rules.uuid(),
        rules.exists({ table: 'users', column: 'id' }),
      ]),
    }),
  })
}

export class DateUserValidator extends MessagesValidator {
  constructor (protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    createdAtFrom: schema.date.optional(),
    createdAtTo: schema.date.optional(),
  })
}
