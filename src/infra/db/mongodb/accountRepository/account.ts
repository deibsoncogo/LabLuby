import { AddAccountRepository } from "../../../../data/protocols/addAccountRepository"
import { AccountModel } from "../../../../domains/models/account.model"
import { AddAccountModel } from "../../../../domains/useCases/addAccount.useCase"
import { MongoHelper } from "../helpers/mongo.helper"

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts")

    const result = await accountCollection.insertOne(accountData)

    return MongoHelper.map(result[0])
  }
}
