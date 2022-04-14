import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IFindFilterAllClientDto } from "../../dtos/iFindFilterAllClientDto";
import { ClientEntity } from "../../entities/clientEntity";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class FindFilterAllClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute({
    cpf, phone, address, city, state, zipCode, averageSalary,
    currentBalance, status, createdAtFrom, createdAtTo,
  }: IFindFilterAllClientDto): Promise<ClientEntity[]> {
    if (createdAtFrom && createdAtTo && createdAtFrom > createdAtTo) {
      throw new AppError("As datas foram informada de forma invertida");
    }

    const clients = await this.clientRepository.findFilterAllClient({
      cpf,
      phone,
      address,
      city,
      state,
      zipCode,
      averageSalary,
      currentBalance,
      status,
      createdAtFrom,
      createdAtTo,
    });

    return clients;
  }
}
