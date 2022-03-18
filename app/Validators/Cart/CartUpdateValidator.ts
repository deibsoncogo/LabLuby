import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CartUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [
        rules.uuid(),
        rules.exists({ table: 'carts', column: 'id' }),
      ]),
    }),

    minValue: schema.number.optional([
      rules.unique({ table: 'carts', column: 'min_value' }),
      rules.unsigned(),
    ]),
  })
}
