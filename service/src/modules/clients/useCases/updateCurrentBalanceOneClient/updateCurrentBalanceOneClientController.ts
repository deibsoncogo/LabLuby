import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { UpdateCurrentBalanceOneClientService } from "./updateCurrentBalanceOneClientService";

export class UpdateCurrentBalanceOneClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, amount } = request.body;

    try {
      YupSetLocale();

      await yup.object().shape({
        cpf: yup.number().required().integer().positive(),
        amount: yup.number().required(),
      }).validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError({ item: error.path, description: error.errors[0] }, 422);
    }

    const updateCurrentBalanceOneClientService = container
      .resolve(UpdateCurrentBalanceOneClientService);

    return response.status(201).json(
      await updateCurrentBalanceOneClientService.execute({ cpf, amount }),
    );
  }
}
