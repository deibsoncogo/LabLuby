import { getRepository, Repository } from "typeorm";
import { ICreateOneClientDto } from "../dtos/iCreateOneClientDto";
import { ClientEntity } from "../entities/clientEntity";
import { IClientRepository } from "./iClientRepository";

export class ClientRepository implements IClientRepository {
  private clientRepository: Repository<ClientEntity>;

  constructor() { this.clientRepository = getRepository(ClientEntity); }

  async findOneCpfNumericClient(cpfNumeric: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ cpfNumeric });

    return client;
  }

  async findOnePhoneClient(phone: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ phone });

    return client;
  }

  async findOneEmailClient(email: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ email });

    return client;
  }

  async createOneClient({
    fullName, email, password, phone, cpfNumeric,
    address, city, state, zipCode, averageSalary, currentBalance, status,
  }: ICreateOneClientDto): Promise<ClientEntity> {
    const client = this.clientRepository.create({
      fullName,
      email,
      password,
      phone,
      cpfNumeric,
      address,
      city,
      state,
      zipCode,
      averageSalary,
      currentBalance,
      status,
    });

    await this.clientRepository.save(client);

    return client;
  }
}
