import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IFindAllFilterClientDto } from "../../dtos/iFindAllFilterClientDto";
import { ClientEntity } from "../../entities/clientEntity";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class FindAllFilterClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute(
    {
      fullName, email, phone, cpfNumeric, address, city, state, zipCode,
      averageSalary, currentBalance, status, createdAtFrom, createdAtTo,
    }: IFindAllFilterClientDto,
  ): Promise<ClientEntity[]> {
    if (createdAtFrom && createdAtTo && createdAtFrom > createdAtTo) {
      throw new AppError("As datas foram informada de forma invertida");
    }

    const clients = await this.clientRepository.findAllFilterClient({
      fullName,
      email,
      phone,
      cpfNumeric,
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
