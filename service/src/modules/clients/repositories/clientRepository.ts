import { getRepository, Repository } from "typeorm";
import { ICreateOneClientDto } from "../dtos/iCreateOneClientDto";
import { IFindAllFilterClientDto } from "../dtos/iFindAllFilterClientDto";
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

  async findAllFilterClient({
    fullName, email, phone, cpfNumeric, address, city, state, zipCode,
    averageSalary, currentBalance, status, createdAtFrom, createdAtTo,
  }: IFindAllFilterClientDto): Promise<ClientEntity[]> {
    const clientsQuery = this.clientRepository
      .createQueryBuilder("clients")
      .addOrderBy("clients.createdAt", "ASC");

    fullName && clientsQuery.andWhere("clients.fullName = :fullName", { fullName });
    email && clientsQuery.andWhere("clients.email = :email", { email });
    phone && clientsQuery.andWhere("clients.phone = :phone", { phone });
    cpfNumeric && clientsQuery.andWhere("clients.cpfNumeric = :cpfNumeric", { cpfNumeric });
    address && clientsQuery.andWhere("clients.address = :address", { address });
    city && clientsQuery.andWhere("clients.city = :city", { city });
    state && clientsQuery.andWhere("clients.state = :state", { state });
    zipCode && clientsQuery.andWhere("clients.zipCode = :zipCode", { zipCode });
    status && clientsQuery.andWhere("clients.status = :status", { status });
    averageSalary && clientsQuery
      .andWhere("clients.averageSalary = :averageSalary", { averageSalary });
    currentBalance && clientsQuery
      .andWhere("clients.currentBalance = :currentBalance", { currentBalance });
    createdAtFrom && clientsQuery
      .andWhere("clients.createdAt >= :createdAtFrom", { createdAtFrom });
    createdAtTo && clientsQuery
      .andWhere("clients.createdAt <= :createdAtTo", { createdAtTo });

    const clientsGetMany = await clientsQuery.getMany();

    return clientsGetMany;
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

    delete client.password;

    return client;
  }
}
