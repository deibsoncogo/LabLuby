import { DbAddAccount } from "../../data/useCases/dbAddAccount/dbAddAccount.useCase"
import { BcryptAdapter } from "../../infra/criptography/bcrypt.adapter"
import { AccountMongoRepository } from "../../infra/db/mongodb/accountRepository/account"
import { SignUpController } from "../../representations/controllers/singUp/signUp.controller"
import { EmailValidatorAdapter } from "../../utils/emailValidator.adapter"

export const makeSingUpController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accountMongoRepository = new AccountMongoRepository()

  const bcryptAdapter = new BcryptAdapter(12)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)

  return signUpController
}
