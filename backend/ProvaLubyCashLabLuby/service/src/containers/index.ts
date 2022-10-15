import { container } from "tsyringe";
import { ClientRepository } from "../modules/clients/repositories/clientRepository";
import { IClientRepository } from "../modules/clients/repositories/iClientRepository";

container.registerSingleton<IClientRepository>("ClientRepository", ClientRepository);
