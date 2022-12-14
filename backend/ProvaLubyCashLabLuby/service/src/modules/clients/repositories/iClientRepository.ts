import { ICreateOneClientDto } from "../dtos/iCreateOneClientDto";
import { IFindFilterAllClientDto } from "../dtos/iFindFilterAllClientDto";
import { IUpdateCurrentBalanceOneClientDto } from "../dtos/iUpdateCurrentBalanceOneClientDto";
import { IUpdateOneClientDto } from "../dtos/iUpdateOneClientDto";
import { ClientEntity } from "../entities/clientEntity";

export interface IClientRepository {
  validateStatusAllClient(): Promise<ClientEntity[]>;
  deleteOneIdClient(id: string): Promise<void>;
  findOneIdClient(id: string): Promise<ClientEntity>;
  findOneCpfClient(cpfNumeric: number): Promise<ClientEntity>;
  findOneEmailClient(email: string): Promise<ClientEntity>;
  findOneUserIdClient(userId: string): Promise<ClientEntity>;

  updateCurrentBalanceOneClient(
    { cpf, amount }: IUpdateCurrentBalanceOneClientDto
  ): Promise<ClientEntity>;

  findFilterAllClient({
    fullName, email, cpf, phone, address, city, state, zipCode, averageSalary,
    currentBalance, status, createdAtFrom, createdAtTo,
  }: IFindFilterAllClientDto): Promise<ClientEntity[]>;

  updateOneClient({
    id, fullName, email, cpf, phone, address,
    city, state, zipCode, averageSalary,
  }: IUpdateOneClientDto): Promise<ClientEntity>;

  createOneClient({
    userId, fullName, email, cpf, phone, address, city, state,
    zipCode, averageSalary, currentBalance, status,
  }: ICreateOneClientDto): Promise<ClientEntity>;
}
