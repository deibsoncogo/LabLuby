import { inject, injectable } from "tsyringe";
import { ClientEntity } from "../../entities/clientEntity";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class FindOneCpfClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute(cpf: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneCpfClient(cpf);

    return client;
  }
}
