import { InvalidParamError } from "../errors/invalidParam.error"
import { MissingParamError } from "../errors/missingParam.error"
import { BadRequest } from "../helpers/http.helper"
import { Controller } from "../protocols/controller"
import { EmailValidatorProtocol } from "../protocols/emailValidator.protocol"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class SignUpController implements Controller {
  private emailValidatorProtocol: EmailValidatorProtocol

  constructor (emailValidatorProtocol: EmailValidatorProtocol) {
    this.emailValidatorProtocol = emailValidatorProtocol
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ["name", "email", "password", "passwordConfirmation"]

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return BadRequest(new MissingParamError(field))
      }
    }

    const isValid = this.emailValidatorProtocol.isValid(httpRequest.body.email)

    if (!isValid) {
      return BadRequest(new InvalidParamError("email"))
    }
  }
}
