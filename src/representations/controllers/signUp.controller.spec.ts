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
    expect(httpResponse.body).toEqual(new Error("Missing param: name"))
  })

  test("Should return 400 id no name is provided", () => {
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
    expect(httpResponse.body).toEqual(new Error("Missing param: email"))
  })
})
