import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessageValidator } from '../CustomMessageValidator'

export class BetUpdateValidator extends CustomMessageValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [
        rules.uuid(),
        rules.exists({ table: 'bets', column: 'id' }),
      ]),
    }),

    item: schema.string.optional({ trim: true }, [rules.regex(/^[\d,]+$/gm)]),

    userId: schema.string.optional({ trim: true }, [
      rules.uuid(),
      rules.exists({ table: 'users', column: 'id' }),
    ]),

    gameId: schema.string.optional({ trim: true }, [
      rules.uuid(),
      rules.exists({ table: 'games', column: 'id' }),
    ]),
  })
}
