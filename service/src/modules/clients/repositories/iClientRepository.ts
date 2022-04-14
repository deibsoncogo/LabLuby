import { ICreateOneClientDto } from "../dtos/iCreateOneClientDto";
import { IFindAllFilterClientDto } from "../dtos/iFindAllFilterClientDto";
import { IUpdateOneClientDto } from "../dtos/iUpdateOneClientDto";
import { ClientEntity } from "../entities/clientEntity";

export interface IClientRepository {
  validateStatusAllClient(): Promise<ClientEntity[]>;
  deleteOneIdClient(id: string): Promise<void>;
  findOneIdClient(id: string): Promise<ClientEntity>;
  findOneCpfClient(cpfNumeric: number): Promise<ClientEntity>;
  findOneUserIdClient(userId: string): Promise<ClientEntity>;

  findAllFilterClient({
    fullName, email, phone, cpfNumeric, address, city, state, zipCode,
    averageSalary, currentBalance, status, createdAtFrom, createdAtTo,
  }: IFindAllFilterClientDto): Promise<ClientEntity[]>;

  updateOneClient(
    { id, cpf, phone, address, city, state, zipCode, averageSalary }: IUpdateOneClientDto
  ): Promise<ClientEntity>;

  createOneClient({
    userId, cpf, phone, address, city, state,
    zipCode, averageSalary, currentBalance, status,
  }: ICreateOneClientDto): Promise<ClientEntity>;
}
