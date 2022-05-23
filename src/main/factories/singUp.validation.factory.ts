import { CompareFieldValidation } from "../../representations/helpers/validators/compare.field.validation"
import { EmailValidation } from "../../representations/helpers/validators/email.validation"
import { RequiredFieldValidation } from "../../representations/helpers/validators/required.field.validation"
import { Validation } from "../../representations/helpers/validators/validation"
import { ValidationComposite } from "../../representations/helpers/validators/validation.composite"
import { EmailValidatorAdapter } from "../../utils/emailValidator.adapter"

export const makeSingUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldValidation("password", "passwordConfirmation"))
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
