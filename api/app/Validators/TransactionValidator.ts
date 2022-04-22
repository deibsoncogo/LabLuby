import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MessagesValidator } from './Customs/Messages'

export class DateTransactionValidator extends MessagesValidator {
  constructor (protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    createdAtFrom: schema.date.optional(),
    createdAtTo: schema.date.optional(),
  })
}
