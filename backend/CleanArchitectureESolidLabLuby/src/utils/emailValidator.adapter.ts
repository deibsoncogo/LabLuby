import validator from "validator"
import { EmailValidator } from "../presentations/protocols/emailValidator.protocol"

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
