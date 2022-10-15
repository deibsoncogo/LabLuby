import { AccountModel, AddAccountModel } from "../useCases/dbAddAccount/dbAddAccount.useCase.protocol"

export interface AddAccountRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}
