import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllFilterClientService } from "./findAllFilterClientService";

export class FindAllFilterClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      fullName, email, phone, cpfNumeric, address, city, state, zipCode,
      averageSalary, currentBalance, status, createdAtFrom, createdAtTo,
    } = request.query;

    const findAllFilterClientService = container.resolve(FindAllFilterClientService);

    return response.status(200).json(
      await findAllFilterClientService.execute({
        fullName: fullName as string,
        email: email as string,
        phone: Number(phone as string),
        cpfNumeric: Number(cpfNumeric as string),
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
