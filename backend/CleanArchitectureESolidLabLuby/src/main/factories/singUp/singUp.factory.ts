import { DbAddAccount } from "../../../data/useCases/dbAddAccount/dbAddAccount.useCase"
import { BcryptAdapter } from "../../../infra/criptography/bcrypt.adapter"
import { AccountMongoRepository } from "../../../infra/db/mongodb/accountRepository/account"
import { LogMongoRepository } from "../../../infra/db/mongodb/logRepository/log"
import { SignUpController } from "../../../presentations/controllers/singUp/signUp.controller"
import { Controller } from "../../../presentations/protocols"
import { LogControllerDecorator } from "../../decorators/log.decorator"
import { makeSingUpValidation } from "./singUp.validation.factory"

export const makeSingUpController = (): Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const logMongoRepository = new LogMongoRepository()

  const bcryptAdapter = new BcryptAdapter(12)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSingUpValidation())

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
