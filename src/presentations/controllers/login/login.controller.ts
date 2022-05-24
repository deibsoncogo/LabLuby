import { badRequest, ok, serverError, unauthorized } from "../../helpers/http/http.helper"
import { Authentication, Controller, HttpRequest, HttpResponse, Validation } from "./login.protocol"

export class LoginController implements Controller {
  private readonly authenticationStub: Authentication
  private readonly validation: Validation

  constructor (authenticationStub: Authentication, validation: Validation) {
    this.authenticationStub = authenticationStub
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body

      const accessToken = await this.authenticationStub.auth({ email, password })

      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
