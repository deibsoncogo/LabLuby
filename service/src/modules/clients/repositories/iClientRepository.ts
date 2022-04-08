import { ICreateOneClientDto } from "../dtos/iCreateOneClientDto";
import { IFindAllFilterClientDto } from "../dtos/iFindAllFilterClientDto";
import { IUpdateOneClientDto } from "../dtos/iUpdateOneClientDto";
import { ClientEntity } from "../entities/clientEntity";

export interface IClientRepository {
  findOneIdClient(id: string): Promise<ClientEntity>;
  findOneCpfNumericClient(cpfNumeric: number): Promise<ClientEntity>;
  findOnePhoneClient(phone: number): Promise<ClientEntity>;
  findOneEmailClient(email: string): Promise<ClientEntity>;

  updateOneClient({
    id, fullName, email, passwordOld, passwordNew, phone,
    cpfNumeric, address, city, state, zipCode, averageSalary,
  }: IUpdateOneClientDto): Promise<ClientEntity>;

  findAllFilterClient({
    fullName, email, phone, cpfNumeric, address, city, state, zipCode,
    averageSalary, currentBalance, status, createdAtFrom, createdAtTo,
  }: IFindAllFilterClientDto): Promise<ClientEntity[]>;

  createOneClient({
    fullName, email, password, phone, cpfNumeric,
    address, city, state, zipCode, averageSalary, currentBalance, status,
  }: ICreateOneClientDto): Promise<ClientEntity>;
}
