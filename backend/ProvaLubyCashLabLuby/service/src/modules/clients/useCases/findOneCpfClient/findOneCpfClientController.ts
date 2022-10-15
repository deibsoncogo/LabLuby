import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindOneCpfClientService } from "./findOneCpfClientService";

export class FindOneCpfClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const findOneCpfClientService = container.resolve(FindOneCpfClientService);

    return response.status(200).json(
      await findOneCpfClientService.execute(Number(cpf)),
    );
  }
}
