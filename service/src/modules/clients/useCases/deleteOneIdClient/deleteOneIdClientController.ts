import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { DeleteOneIdClientService } from "./deleteOneIdClientService";

export class DeleteOneIdClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      YupSetLocale();

      await yup.object().shape(
        { id: yup.string().required().uuid() },
      ).validate(request.params, { abortEarly: true });
    } catch (error) {
      throw new AppError({ item: error.path, description: error.errors[0] }, 422);
    }

    const clientService = container.resolve(DeleteOneIdClientService);

    return response.status(204).json(
      await clientService.execute(id),
    );
  }
}
