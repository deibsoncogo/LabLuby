import { ICreateOneClientDto } from "../dtos/iCreateOneClientDto";
import { IFindAllFilterClientDto } from "../dtos/iFindAllFilterClientDto";
import { ClientEntity } from "../entities/clientEntity";

export interface IClientRepository {
  findOneCpfNumericClient(cpfNumeric: number): Promise<ClientEntity>;
  findOnePhoneClient(phone: number): Promise<ClientEntity>;
  findOneEmailClient(email: string): Promise<ClientEntity>;

  findAllFilterClient({
    fullName, email, phone, cpfNumeric, address, city, state, zipCode,
    averageSalary, currentBalance, status, createdAtFrom, createdAtTo,
  }: IFindAllFilterClientDto): Promise<ClientEntity[]>;

  createOneClient({
    fullName, email, password, phone, cpfNumeric,
    address, city, state, zipCode, averageSalary, currentBalance, status,
  }: ICreateOneClientDto): Promise<ClientEntity>;
}
