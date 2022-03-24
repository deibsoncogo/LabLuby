import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessageValidator } from '../CustomMessageValidator'

export class BetStoreValidator extends CustomMessageValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    valueCart: schema.number([rules.unsigned(), rules.numberInteger()]),

    userId: schema.string({ trim: true }, [
      rules.uuid(),
      rules.exists({ table: 'users', column: 'id' }),
    ]),

    games: schema.array().members(
      schema.object().members({
        item: schema.string({ trim: true }, [rules.regex(/^[\d,]+$/gm)]),

        gameId: schema.string({ trim: true }, [
          rules.uuid(),
          rules.exists({ table: 'games', column: 'id' }),
        ]),
      })
    ),
  })
}
