import { getRepository, Repository } from "typeorm";
import { ICreateOneClientDto } from "../dtos/iCreateOneClientDto";
import { IFindFilterAllClientDto } from "../dtos/iFindFilterAllClientDto";
import { IUpdateCurrentBalanceOneClientDto } from "../dtos/iUpdateCurrentBalanceOneClientDto";
import { IUpdateOneClientDto } from "../dtos/iUpdateOneClientDto";
import { ClientEntity } from "../entities/clientEntity";
import { IClientRepository } from "./iClientRepository";

export class ClientRepository implements IClientRepository {
  private clientRepository: Repository<ClientEntity>;

  constructor() { this.clientRepository = getRepository(ClientEntity); }

  async validateStatusAllClient(): Promise<ClientEntity[]> {
    const clients = await this.clientRepository.find({ status: "desaproved" });

    const clientsReevaluated = [];

    for (const client of clients) {
      if (client.averageSalary >= 250) {
        client.currentBalance = 200;
        client.status = "approved";

        await this.clientRepository.save(client);

        clientsReevaluated.push(client);
      }
    }

    return clientsReevaluated;
  }

  async deleteOneIdClient(id: string): Promise<void> {
    await this.clientRepository.delete({ id });
  }

  async findOneIdClient(id: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ id });
    return client;
  }

  async findOneCpfClient(cpf: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ cpf });
    return client;
  }

  async findOneEmailClient(email: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ email });
    return client;
  }

  async findOneUserIdClient(userId: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ userId });
    return client;
  }

  async updateCurrentBalanceOneClient(
    { cpf, amount }: IUpdateCurrentBalanceOneClientDto,
  ): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ cpf });

    client.currentBalance += amount;
    client.currentBalance = Number(client.currentBalance.toFixed(2));

    await this.clientRepository.save(client);

    return client;
  }

  async findFilterAllClient({
    fullName, email, cpf, phone, address, city, state, zipCode, averageSalary,
    currentBalance, status, createdAtFrom, createdAtTo,
  }: IFindFilterAllClientDto): Promise<ClientEntity[]> {
    const query = this.clientRepository
      .createQueryBuilder("clients").addOrderBy("clients.createdAt", "ASC");

    fullName && query.andWhere("clients.fullName = :fullName", { fullName });
    email && query.andWhere("clients.email = :email", { email });
    cpf && query.andWhere("clients.cpf = :cpf", { cpf });
    phone && query.andWhere("clients.phone = :phone", { phone });
    address && query.andWhere("clients.address = :address", { address });
    city && query.andWhere("clients.city = :city", { city });
    state && query.andWhere("clients.state = :state", { state });
    zipCode && query.andWhere("clients.zipCode = :zipCode", { zipCode });
    averageSalary && query.andWhere("clients.averageSalary = :averageSalary", { averageSalary });
    currentBalance && query.andWhere("clients.currentBalance = :currentBalance", { currentBalance });
    status && query.andWhere("clients.status = :status", { status });
    createdAtFrom && query.andWhere("clients.createdAt >= :createdAtFrom", { createdAtFrom });
    createdAtTo && query.andWhere("clients.createdAt <= :createdAtTo", { createdAtTo });

    const clients = await query.getMany();

    return clients;
  }

  async updateOneClient({
    id, fullName, email, cpf, phone, address,
    city, state, zipCode, averageSalary,
  }: IUpdateOneClientDto): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ id });

    client.fullName = fullName || client.fullName;
    client.email = email || client.email;
    client.cpf = cpf || client.cpf;
    client.phone = phone || client.phone;
    client.address = address || client.address;
    client.city = city || client.city;
    client.state = state || client.state;
    client.zipCode = zipCode || client.zipCode;
    client.averageSalary = averageSalary || client.averageSalary;
    client.updatedAt = new Date();

    await this.clientRepository.save(client);

    return client;
  }

  async createOneClient({
    userId, fullName, email, cpf, phone, address, city, state,
    zipCode, averageSalary, currentBalance, status,
  }: ICreateOneClientDto): Promise<ClientEntity> {
    const client = this.clientRepository.create({
      userId,
      fullName,
      email,
      cpf,
      phone,
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
