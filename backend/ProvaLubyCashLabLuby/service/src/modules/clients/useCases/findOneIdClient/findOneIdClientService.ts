import { inject, injectable } from "tsyringe";
import { ClientEntity } from "../../entities/clientEntity";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class FindOneIdClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute(id: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneIdClient(id);

    return client;
  }
}
