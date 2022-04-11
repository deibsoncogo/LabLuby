import { inject, injectable } from "tsyringe";
import { SendEmailUtils } from "../../../../utils/sendEmailUtils";
import { ClientEntity } from "../../entities/clientEntity";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class ValidateStatusAllClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute(): Promise<ClientEntity[]> {
    const clients = await this.clientRepository.validateStatusAllClient();

    for (const client of clients) {
      SendEmailUtils({
        type: "ClientStatus",
        name: client.fullName,
        email: client.email,
        status: "approved",
      });
    }

    return clients;
  }
}
