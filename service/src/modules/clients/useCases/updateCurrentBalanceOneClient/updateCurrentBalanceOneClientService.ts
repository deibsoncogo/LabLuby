import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IUpdateCurrentBalanceOneClientDto } from "../../dtos/iUpdateCurrentBalanceOneClientDto";
import { ClientEntity } from "../../entities/clientEntity";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class UpdateCurrentBalanceOneClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute({ cpf, amount }: IUpdateCurrentBalanceOneClientDto): Promise<ClientEntity> {
    const cpfExists = await this.clientRepository.findOneCpfClient(cpf);

    if (!cpfExists) {
      throw new AppError("Não existe um cliente registrado com este CPF", 409);
    }

    if (cpfExists.status !== "approved") {
      throw new AppError("Este cliente não possui autorização para executar transações", 409);
    }

    cpfExists.currentBalance += amount;
    cpfExists.currentBalance = Number(cpfExists.currentBalance.toFixed(2));

    if (cpfExists.currentBalance < 0) {
      throw new AppError("O cliente não possui saldo suficiente", 409);
    }

    const client = await this.clientRepository.updateCurrentBalanceOneClient(
      { cpf, amount: cpfExists.currentBalance },
    );

    return client;
  }
}
