import { CompareFieldValidation } from "../../../representations/helpers/validators/compare.field.validation"
import { EmailValidation } from "../../../representations/helpers/validators/email.validation"
import { RequiredFieldValidation } from "../../../representations/helpers/validators/required.field.validation"
import { Validation } from "../../../representations/helpers/validators/validation"
import { ValidationComposite } from "../../../representations/helpers/validators/validation.composite"
import { EmailValidator } from "../../../representations/protocols/emailValidator.protocol"
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
