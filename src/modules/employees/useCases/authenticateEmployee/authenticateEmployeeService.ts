import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { ICreateAuthenticateOneEmployeeDto } from "../../dtos/iCreateAuthenticateOneEmployeeDto";
import { IEmployeeRepository } from "../../repositories/iEmployeeRepository";

interface IToken {
  token: string;
}

@injectable()
export class AuthenticateEmployeeService {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) { }

  async execute({ email, password }: ICreateAuthenticateOneEmployeeDto): Promise<IToken> {
    const messageAuthenticateInvalid = "E-mail ou senha inválido";

    const employee = await this.employeeRepository.findOneEmailEmployee(email);

    if (!employee) {
      throw new AppError(messageAuthenticateInvalid, 401);
    }

    const passwordMatch = await compare(password, employee.password);

    if (!passwordMatch) {
      throw new AppError(messageAuthenticateInvalid, 401);
    }

    if (employee.off) {
      throw new AppError("Este funcionário está desligado", 401);
    }

    const token = sign(
      {}, "fa5473530e4d1a5a1e1eb53d2fedb10c", { subject: employee.id, expiresIn: "12h" },
    );

    return { token };
  }
}
