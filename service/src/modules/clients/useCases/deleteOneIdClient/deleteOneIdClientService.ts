import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class DeleteOneIdClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute(id:string): Promise<object> {
    const idExists = await this.clientRepository.findOneIdClient(id);

    if (!idExists) {
      throw new AppError("Não existe um usuário com este ID", 406);
    }

    await this.clientRepository.deleteOneIdClient(id);

    return { message: "Usuário excluído" };
  }
}
