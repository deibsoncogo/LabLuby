import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessageValidator } from '../CustomMessageValidator'

export class GameUpdateValidator extends CustomMessageValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [
        rules.uuid(),
        rules.exists({ table: 'games', column: 'id' }),
      ]),
    }),

    minValue: schema.number.optional([
      rules.unique({ table: 'games', column: 'min_value' }),
      rules.unsigned(),
    ]),
  })
}
