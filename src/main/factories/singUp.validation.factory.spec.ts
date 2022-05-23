import { RequiredFieldValidation } from "../../representations/helpers/validators/required.field.validation"
import { Validation } from "../../representations/helpers/validators/validation"
import { ValidationComposite } from "../../representations/helpers/validators/validation.composite"
import { makeSingUpController } from "./singUp.factory"

jest.mock("../../representations/helpers/validators/validation.composite")

describe("Sign up validation factory", () => {
  test("Should call ValidationComposite with all validatations", () => {
    makeSingUpController()

    const validations: Validation[] = []

    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
