import { EmailValidation, RequiredFieldValidation, ValidationComposite } from "../../../presentations/helpers/validators"
import { Validation } from "../../../presentations/protocols/validation"
import { EmailValidatorAdapter } from "../../../utils/emailValidator.adapter"

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ["email", "password"]) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation("email", new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
