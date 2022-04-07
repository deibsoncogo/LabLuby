import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { ICreateOneClientDto } from "../../dtos/iCreateOneClientDto";
import { ClientEntity } from "../../entities/clientEntity";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class CreateOneClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute({
    fullName, email, password, phone, cpfNumeric,
    address, city, state, zipCode, averageSalary, currentBalance = 0, status = "desaproved",
  }: ICreateOneClientDto): Promise<ClientEntity> {
    const emailAlreadyExists = await this.clientRepository.findOneEmailClient(email);

    if (emailAlreadyExists) {
      throw new AppError("Já existe este e-mail registrado no sistema", 406);
    }

    const phoneAlreadyExists = await this.clientRepository.findOnePhoneClient(phone);

    if (phoneAlreadyExists) {
      throw new AppError("Já existe este número de telefone registrado no sistema", 406);
    }

    const cpfNumericAlreadyExists = await this.clientRepository.findOneCpfNumericClient(cpfNumeric);

    if (cpfNumericAlreadyExists) {
      throw new AppError("Já existe este CPF registrado no sistema", 406);
    }

    if (averageSalary >= 250) {
      currentBalance = 200;
      status = "approved";
    } else {
      // criar o envio de e-mail de cadastro reprovado
    }

    const client = await this.clientRepository.createOneClient({
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

    return client;
  }
}
