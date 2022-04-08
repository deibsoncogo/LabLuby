import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { UpdateOneClientService } from "./updateOneClientService";

export class UpdateOneClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      fullName, email, passwordOld, passwordNew, phone,
      cpfNumeric, address, city, state, zipCode, averageSalary,
    } = request.query;

    try {
      YupSetLocale();

      await yup.object().shape(
        { id: yup.string().required().uuid() },
      ).validate(request.params, { abortEarly: true });

      await yup.object().shape({
        fullName: yup.string().matches(/[\s]/g, "Deve conter um espaço no nome"),
        email: yup.string().email(),
        phone: yup.number().integer().positive(),
        cpfNumeric: yup.number().integer().positive(),
        address: yup.string().min(5).max(100),
        city: yup.string().min(5).max(100),
        state: yup.string().min(5).max(100),
        zipCode: yup.number().integer().positive(),
        averageSalary: yup.number().integer().positive(),
        passwordOld: yup.string().min(6).max(100)
          .matches(/[0-9]{2,}/gm, "A senha deve possuir pelo menos dois números")
          .matches(/[a-z]{2,}/gm, "A senha deve possuir pelo menos duas letras minusculas")
          .matches(/[A-Z]{2,}/gm, "A senha deve possuir pelo menos duas letras maiúsculas"),
        passwordNew: yup.string().min(6).max(100)
          .matches(/[0-9]{2,}/gm, "A senha deve possuir pelo menos dois números")
          .matches(/[a-z]{2,}/gm, "A senha deve possuir pelo menos duas letras minusculas")
          .matches(/[A-Z]{2,}/gm, "A senha deve possuir pelo menos duas letras maiúsculas"),
      }).validate(request.query, { abortEarly: true });
    } catch (error) {
      throw new AppError({ item: error.path, description: error.errors[0] }, 422);
    }

    const updateOneClientService = container.resolve(UpdateOneClientService);

    return response.status(201).json(
      await updateOneClientService.execute({
        id: id as string,
        fullName: fullName as string,
        email: email as string,
        passwordOld: passwordOld as string,
        passwordNew: passwordNew as string,
        phone: Number(phone as string),
        cpfNumeric: Number(cpfNumeric as string),
        address: address as string,
        city: city as string,
        state: state as string,
        zipCode: Number(zipCode as string),
        averageSalary: Number(averageSalary as string),
      }),
    );
  }
}
