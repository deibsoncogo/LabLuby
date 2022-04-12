import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessageValidator } from './CustomMessageValidator'

export class StoreRuleValidator extends CustomMessageValidator{
  constructor (protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(50),
      rules.regex(/^[a-z]+$/g),
      rules.unique({ table: 'rules', column: 'name' }),
    ]),
  })
}

export class UpdateRuleValidator extends CustomMessageValidator{
  constructor (protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [
        rules.uuid(),
        rules.exists({ table: 'rules', column: 'id' }),
      ]),
    }),

    name: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(50),
      rules.regex(/^[a-z]+$/g),
      rules.unique({ table: 'rules', column: 'name' }),
    ]),
  })
}

export class IdRuleValidator extends CustomMessageValidator{
  constructor (protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [
        rules.uuid(),
        rules.exists({ table: 'rules', column: 'id' }),
      ]),
    }),
  })
}
