import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { CreateOneClientService } from "./createOneClientService";

export class CreateOneClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      userId, cpf, phone, address, city, state,
      zipCode, averageSalary, fullName, email,
    } = request.body;

    try {
      YupSetLocale();

      await yup.object().shape({
        userId: yup.string().required().uuid(),
        cpf: yup.number().required().integer().positive(),
        phone: yup.number().required().integer().positive(),
        address: yup.string().required().min(5).max(255),
        city: yup.string().required().min(5).max(100),
        state: yup.string().required().min(5).max(100),
        zipCode: yup.number().required().integer().positive(),
        averageSalary: yup.number().required().integer().positive(),
        fullName: yup.string().required(),
        email: yup.string().required().email(),
      }).validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError({ item: error.path, description: error.errors[0] }, 422);
    }

    const createOneClientService = container.resolve(CreateOneClientService);

    return response.status(201).json(
      await createOneClientService.execute(
        { userId, cpf, phone, address, city, state, zipCode, averageSalary, fullName, email },
      ),
    );
  }
}
