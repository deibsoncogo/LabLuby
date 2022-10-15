import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { FindFilterAllClientService } from "./findFilterAllClientService";

export class FindFilterAllClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      fullName, email, cpf, phone, address, city, state, zipCode, averageSalary,
      currentBalance, status, createdAtFrom, createdAtTo,
    } = request.query;

    try {
      YupSetLocale();

      await yup.object().shape({
        fullName: yup.string().min(3).max(100),
        email: yup.string().email(),
        cpf: yup.number().integer().positive(),
        phone: yup.number().integer().positive(),
        address: yup.string().min(5).max(100),
        city: yup.string().min(5).max(100),
        state: yup.string().min(5).max(100),
        zipCode: yup.number().integer().positive(),
        averageSalary: yup.number().integer(),
        currentBalance: yup.number().integer(),
        status: yup.string().min(2).max(50),
        createdAtFrom: yup.date(),
        createdAtTo: yup.date(),
      }).validate(request.query, { abortEarly: true });
    } catch (error) {
      throw new AppError({ item: error.path, description: error.errors[0] }, 422);
    }

    const findFilterAllClientService = container.resolve(FindFilterAllClientService);

    return response.status(200).json(
      await findFilterAllClientService.execute({
        fullName: fullName as string,
        email: email as string,
        cpf: Number(cpf as string),
        phone: Number(phone as string),
        address: address as string,
        city: city as string,
        state: state as string,
        zipCode: Number(zipCode as string),
        averageSalary: Number(averageSalary as string),
        currentBalance: Number(currentBalance as string),
        status: status as string,
        createdAtFrom: createdAtFrom && new Date(`${createdAtFrom} 00:00:00` as string),
        createdAtTo: createdAtTo && new Date(`${createdAtTo} 23:59:59` as string),
      }),
    );
  }
}
