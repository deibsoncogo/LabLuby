/* eslint-disable no-template-curly-in-string */
import * as yup from "yup"

export function YupSetLocale() {
  return yup.setLocale({
    mixed: {
      notType: "Tipo do dado inválido",
      default: "Dado inválido",
      required: "Campo obrigatório",
      oneOf: "Deve conter um destes valores: ${values}",
      notOneOf: "Não pode conter um destes valores: ${values}",
    },

    string: {
      length: "Deve ter ${length} caracteres",
      min: "Deve ter no mínimo ${min} caracteres",
      max: "Deve ter no máximo ${max} caracteres",
      trim: "Não deve começar ou terminar com espaço",
      email: "Formato de email inválido",
      url: "Formato de URL inválido",
      uuid: "Formato de ID inválido",
    },

    number: {
      lessThan: "Deve ser menor que ${less}",
      moreThan: "Deve ser maior que ${more}",
      positive: "Deve ser um número positivo",
      negative: "Deve ser um número negativo",
      integer: "Deve ser um número inteiro",
    },
  })
}
