import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateOneEmployeeService } from "./updateOneEmployeeService";

export class UpdateOneEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, cpf, email, passwordOld, passwordNew } = request.query;

    const updateOneEmployeeService = container.resolve(UpdateOneEmployeeService);

    return response.status(201).json(
      await updateOneEmployeeService.execute({
        id: id as string,
        name: name as string,
        cpf: Number(cpf as string),
        email: email as string,
        passwordOld: passwordOld as string,
        passwordNew: passwordNew as string,
      }),
    );
  }
}
