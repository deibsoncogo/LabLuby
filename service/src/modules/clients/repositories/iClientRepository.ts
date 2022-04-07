import { ICreateOneClientDto } from "../dtos/iCreateOneClientDto";
import { ClientEntity } from "../entities/clientEntity";

export interface IClientRepository {
  findOneCpfNumericClient(cpfNumeric: number): Promise<ClientEntity>;
  findOnePhoneClient(phone: number): Promise<ClientEntity>;
  findOneEmailClient(email: string): Promise<ClientEntity>;

  createOneClient({
    fullName, email, password, phone, cpfNumeric,
    address, city, state, zipCode, averageSalary, currentBalance, status,
  }: ICreateOneClientDto): Promise<ClientEntity>;
}
