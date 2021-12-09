import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateEmployeeService } from "./updateEmployeeService";

export class UpdateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, cpf, email, passwordOld, passwordNew, avatarUrl } = request.query;

    const updateEmployeeService = container.resolve(UpdateEmployeeService);

    return response.status(201).json(
      await updateEmployeeService.execute({
        id: id as string,
        name: name as string,
        cpf: Number(cpf as string),
        email: email as string,
        passwordOld: passwordOld as string,
        passwordNew: passwordNew as string,
        avatarUrl: avatarUrl as string,
      }),
    );
  }
}
