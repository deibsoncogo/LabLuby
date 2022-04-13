import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MessagesValidator } from './Customs/Messages'

export class StoreRuleValidator extends MessagesValidator {
  constructor (protected ctx: HttpContextContract) {
    super()
  }
  // messages

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(50),
      rules.regex(/^[a-z]+$/g),
      rules.unique({ table: 'rules', column: 'name' }),
    ]),
  })
}

export class UpdateRuleValidator {
  constructor (protected ctx: HttpContextContract) {}

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

  public messages = {
    'string': 'O formado do campo deve ser um texto',
    'number': 'O formado do campo deve ser um número',
    'exists': 'Não foi encontrado nenhum registro',
    'required': 'Este campo é obrigatório',
    'unique': 'Já existe este valor registrado no sistema',
    'uuid': 'O formato do ID não é válido',
    'name.regex': 'É permitido somente letras minusculas sem acento',
  }
}

export class IdRuleValidator extends MessagesValidator {
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
