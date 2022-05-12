import { MissingParamError } from "../errors/missingParam.error"
import { SignUpController } from "./signUp.controller"

describe("Sign up controller", () => {
  test("Should return 400 id no name is provided", () => {
    const sub = new SignUpController()

    const httpRequest = {
      body: {
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    }

    const httpResponse = sub.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("name"))
  })

  test("Should return 400 id no email is provided", () => {
    const sub = new SignUpController()

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    }

    const httpResponse = sub.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("email"))
  })

  test("Should return 400 id no password is provided", () => {
    const sub = new SignUpController()

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        passwordConfirmation: "any_password"
      }
    }

    const httpResponse = sub.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("password"))
  })

  test("Should return 400 id no password confirmation is provided", () => {
    const sub = new SignUpController()

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password"
      }
    }

    const httpResponse = sub.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("passwordConfirmation"))
  })
})
