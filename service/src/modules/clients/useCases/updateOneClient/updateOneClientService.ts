import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IUpdateOneClientDto } from "../../dtos/iUpdateOneClientDto";
import { ClientEntity } from "../../entities/clientEntity";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class UpdateOneClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute({
    id, fullName, email, cpf, phone, address,
    city, state, zipCode, averageSalary,
  }: IUpdateOneClientDto): Promise<ClientEntity> {
    if (
      !fullName && !email && !cpf && !phone && !address
      && !city && !state && !zipCode && !averageSalary
    ) {
      throw new AppError("Não foi informado nenhum dado para alteração", 200);
    }

    const idExists = await this.clientRepository.findOneIdClient(id);

    if (!idExists) {
      throw new AppError("Não existe um usuário com este ID", 406);
    }

    if (email) {
      const emailAlreadyExists = await this.clientRepository.findOneEmailClient(email);

      if (emailAlreadyExists) {
        throw new AppError("Já existe este e-mail registrado", 406);
      }
    }

    if (cpf) {
      const cpfAlreadyExists = await this.clientRepository.findOneCpfClient(cpf);

      if (cpfAlreadyExists) {
        throw new AppError("Já existe este CPF registrado", 406);
      }
    }

    const client = await this.clientRepository.updateOneClient(
      { id, fullName, email, cpf, phone, address, city, state, zipCode, averageSalary },
    );

    return client;
  }
}
