import { CompareFieldValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from "../../../presentations/helpers/validators"
import { Validation } from "../../../presentations/protocols/validation"
import { EmailValidatorAdapter } from "../../../utils/emailValidator.adapter"

export const makeSingUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldValidation("password", "passwordConfirmation"))
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
