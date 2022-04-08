import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IUpdateOneClientDto } from "../../dtos/iUpdateOneClientDto";
import { ClientEntity } from "../../entities/clientEntity";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class UpdateOneClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute({
    id, fullName, email, passwordOld, passwordNew, phone,
    cpfNumeric, address, city, state, zipCode, averageSalary,
  }: IUpdateOneClientDto): Promise<ClientEntity> {
    if (
      !fullName && !email && !passwordOld && !passwordNew && !phone
      && !cpfNumeric && !address && !city && !state && !zipCode && !averageSalary
    ) {
      throw new AppError("Não foi informado nenhum dado para alteração", 200);
    }

    const idExists = await this.clientRepository.findOneIdClient(id);

    if (!idExists) {
      throw new AppError("Não existe um usuário registrado com este ID", 406);
    }

    if (email) {
      const emailAlreadyExists = await this.clientRepository.findOneEmailClient(email);

      if (emailAlreadyExists) {
        throw new AppError("Já existe este e-mail registrado", 406);
      }
    }

    let passwordHash: string;
    if (passwordOld && passwordNew) {
      const isPasswordOldValid = await compare(passwordOld, idExists.password);

      if (!isPasswordOldValid) {
        throw new AppError("Senha antiga inválida", 406);
      }

      passwordHash = await hash(passwordNew, 8);
    }

    if (phone) {
      const phoneAlreadyExists = await this.clientRepository.findOnePhoneClient(phone);

      if (phoneAlreadyExists) {
        throw new AppError("Já existe este número de telefone registrado", 406);
      }
    }

    if (cpfNumeric) {
      const cpfNumericAlreadyExists = await this.clientRepository.findOneCpfNumericClient(cpfNumeric);

      if (cpfNumericAlreadyExists) {
        throw new AppError("Já existe este CPF registrado", 406);
      }
    }

    const client = await this.clientRepository.updateOneClient({
      id,
      fullName,
      email,
      passwordOld,
      passwordNew: passwordHash,
      phone,
      cpfNumeric,
      address,
      city,
      state,
      zipCode,
      averageSalary,
    });

    return client;
  }
}
