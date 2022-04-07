import { getRepository, Repository } from "typeorm";
import { ClientEntity } from "../entities/clientEntity";
import { IClientRepository } from "./iClientRepository";

export class ClientRepository implements IClientRepository {
  private clientRepository: Repository<ClientEntity>;

  constructor() { this.clientRepository = getRepository(ClientEntity); }

  teste(): Promise<void> {
    throw new Error("Method not implemented");
  }
}
