import { RequiredFieldValidation } from "../../representations/helpers/validators/required.field.validation"
import { Validation } from "../../representations/helpers/validators/validation"
import { ValidationComposite } from "../../representations/helpers/validators/validation.composite"

export const makeSingUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
