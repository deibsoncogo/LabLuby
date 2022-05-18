import { InvalidParamError } from "../errors/invalidParam.error"
import { MissingParamError } from "../errors/missingParam.error"
import { badRequest } from "../helpers/http.helper"
import { Controller } from "../protocols/controller.protocol"
import { EmailValidator } from "../protocols/emailValidator.protocol"
import { HttpRequest, HttpResponse } from "../protocols/http.protocol"

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ["name", "email", "password", "passwordConfirmation"]

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email)

    if (!isValid) {
      return badRequest(new InvalidParamError("email"))
    }
  }
}
