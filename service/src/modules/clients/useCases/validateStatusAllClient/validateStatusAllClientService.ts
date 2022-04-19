import axios from "axios";
import { inject, injectable } from "tsyringe";
import { SendEmailUtils } from "../../../../utils/sendEmailUtils";
import { ClientEntity } from "../../entities/clientEntity";
import { IClientRepository } from "../../repositories/iClientRepository";

@injectable()
export class ValidateStatusAllClientService {
  constructor(@inject("ClientRepository") private clientRepository: IClientRepository) {}

  async execute(token?: string): Promise<ClientEntity[]> {
    const clients = await this.clientRepository.validateStatusAllClient();

    for (const client of clients) {
      const responseAxios = await axios.get(
        `http://localhost:3333/user/${client.userId}`,
        { headers: { authorization: token } },
      )
        .then((response) => [response.status, response.data])
        .catch((error) => [error.response.status, error.response.data]);

      SendEmailUtils({
        type: "ClientStatus",
        fullName: responseAxios[1].user.full_name,
        email: responseAxios[1].user.email,
        status: "approved",
      });
    }

    return clients;
  }
}
