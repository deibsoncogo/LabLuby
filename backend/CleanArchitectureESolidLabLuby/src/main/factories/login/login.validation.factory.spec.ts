import { EmailValidation, RequiredFieldValidation, ValidationComposite } from "../../../presentations/helpers/validators"
import { EmailValidator } from "../../../presentations/protocols/emailValidator.protocol"
import { Validation } from "../../../presentations/protocols/validation"
import { makeLoginValidation } from "./login.validation.factory"

jest.mock("../../../representations/helpers/validators/validation.composite")

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe("Login validation factory", () => {
  test("Should call ValidationComposite with all validatations", () => {
    makeLoginValidation()

    const validations: Validation[] = []

    for (const field of ["email", "password"]) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation("email", makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
