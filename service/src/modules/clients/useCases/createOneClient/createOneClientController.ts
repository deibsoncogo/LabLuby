import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";
import { AppError } from "../../../../errors/appError";
import { YupSetLocale } from "../../../../utils/yupSetLocale";
import { CreateOneClientService } from "./createOneClientService";

export class CreateOneClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      fullName, email, password, phone, cpfNumeric,
      address, city, state, zipCode, averageSalary,
    } = request.body;

    try {
      YupSetLocale();

      const schema = yup.object().shape({
        fullName: yup.string().required().matches(/[\s]/g, "Deve conter um espaço no nome"),
        email: yup.string().required().email(),
        phone: yup.number().required().integer().positive(),
        cpfNumeric: yup.number().required().integer().positive(),
        address: yup.string().required().min(5).max(100),
        city: yup.string().required().min(5).max(100),
        state: yup.string().required().min(5).max(100),
        zipCode: yup.number().required().integer().positive(),
        averageSalary: yup.number().required().integer().positive(),
        password: yup.string().required().min(6).max(100)
          .matches(/[0-9]{2,}/gm, "A senha deve possuir pelo menos dois números")
          .matches(/[a-z]{2,}/gm, "A senha deve possuir pelo menos duas letras minusculas")
          .matches(/[A-Z]{2,}/gm, "A senha deve possuir pelo menos duas letras maiúsculas"),
      });

      await schema.validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError({ item: error.path, description: error.errors[0] });
    }

    const createOneClientService = container.resolve(CreateOneClientService);

    return response.status(201).json(
      await createOneClientService.execute({
        fullName,
        email,
        password,
        phone,
        cpfNumeric,
        address,
        city,
        state,
        zipCode,
        averageSalary,
      }),
    );
  }
}
