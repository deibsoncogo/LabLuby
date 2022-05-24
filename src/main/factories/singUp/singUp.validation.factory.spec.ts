import { CompareFieldValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from "../../../presentations/helpers/validators"
import { EmailValidator } from "../../../presentations/protocols/emailValidator.protocol"
import { Validation } from "../../../presentations/protocols/validation"
import { makeSingUpController } from "./singUp.factory"

jest.mock("../../../representations/helpers/validators/validation.composite")

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe("Sign up validation factory", () => {
  test("Should call ValidationComposite with all validatations", () => {
    makeSingUpController()

    const validations: Validation[] = []

    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldValidation("password", "passwordConfirmation"))
    validations.push(new EmailValidation("email", makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
