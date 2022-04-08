import { inject, injectable } from "tsyringe";
import { ClientEntity } from "../../entities/clientEntity";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class ValidateStatusAllClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute(): Promise<ClientEntity[]> {
    const clients = await this.clientRepository.validateStatusAllClient();

    return clients;
  }
}
