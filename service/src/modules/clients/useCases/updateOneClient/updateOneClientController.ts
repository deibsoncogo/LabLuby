import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { UpdateOneClientService } from "./updateOneClientService";

export class UpdateOneClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { cpf, phone, address, city, state, zipCode, averageSalary } = request.query;

    try {
      YupSetLocale();

      await yup.object().shape(
        { id: yup.string().required().uuid() },
      ).validate(request.params, { abortEarly: true });

      await yup.object().shape({
        cpf: yup.number().integer().positive(),
        phone: yup.number().integer().positive(),
        address: yup.string().min(5).max(100),
        city: yup.string().min(5).max(100),
        state: yup.string().min(5).max(100),
        zipCode: yup.number().integer().positive(),
        averageSalary: yup.number().integer().positive(),
      }).validate(request.query, { abortEarly: true });
    } catch (error) {
      throw new AppError({ item: error.path, description: error.errors[0] }, 422);
    }

    const updateOneClientService = container.resolve(UpdateOneClientService);

    return response.status(201).json(
      await updateOneClientService.execute({
        id: id as string,
        cpf: Number(cpf as string),
        phone: Number(phone as string),
        address: address as string,
        city: city as string,
        state: state as string,
        zipCode: Number(zipCode as string),
        averageSalary: Number(averageSalary as string),
      }),
    );
  }
}
