import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { SendEmailUtils } from "../../../../utils/sendEmailUtils";
import { ICreateOneClientDto } from "../../dtos/iCreateOneClientDto";
import { ClientEntity } from "../../entities/clientEntity";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class CreateOneClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute(
    {
      userId, cpf, phone, address, city, state,
      zipCode, averageSalary, currentBalance, status, fullName, email,
    }: ICreateOneClientDto,
  ): Promise<ClientEntity> {
    const userIdAlreadyExists = await this.clientRepository.findOneUserIdClient(userId);

    if (userIdAlreadyExists) {
      throw new AppError("Já existe este usuário registrado como cliente", 406);
    }

    const cpfAlreadyExists = await this.clientRepository.findOneCpfClient(cpf);

    if (cpfAlreadyExists) {
      throw new AppError("Já existe este CPF registrado", 406);
    }

    if (averageSalary >= 250) {
      currentBalance = 200;
      status = "approved";
    } else {
      currentBalance = 0;
      status = "desaproved";
    }

    const client = await this.clientRepository.createOneClient(
      { userId, cpf, phone, address, city, state, zipCode, averageSalary, currentBalance, status },
    );

    if (client.status === "approved") {
      SendEmailUtils({ type: "ClientStatus", fullName, email, status: "approved" });
    } else if (client.status === "desaproved") {
      SendEmailUtils({ type: "ClientStatus", fullName, email, status: "desaproved" });
    }

    return client;
  }
}
