import { InvalidParamError } from "../errors/invalidParam.error"
import { MissingParamError } from "../errors/missingParam.error"
import { EmailValidatorProtocol } from "../protocols/emailValidator.protocol"
import { SignUpController } from "./signUp.controller"

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidatorProtocol
}

const MakeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidatorProtocol {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()

  const sut = new SignUpController(emailValidatorStub)

  return { sut, emailValidatorStub }
}

describe("Sign up controller", () => {
  test("Should return 400 id no name is provided", () => {
    const { sut } = MakeSut()

    const httpRequest = {
      body: {
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("name"))
  })

  test("Should return 400 id no email is provided", () => {
    const { sut } = MakeSut()

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("email"))
  })

  test("Should return 400 id no password is provided", () => {
    const { sut } = MakeSut()

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        passwordConfirmation: "any_password"
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("password"))
  })

  test("Should return 400 id no password confirmation is provided", () => {
    const { sut } = MakeSut()

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password"
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("passwordConfirmation"))
  })

  test("Should return 400 if an invalid email is provided", () => {
    const { sut, emailValidatorStub } = MakeSut()

    jest.spyOn(emailValidatorStub, "isValid").mockReturnValue(false)

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError("email"))
  })
})
