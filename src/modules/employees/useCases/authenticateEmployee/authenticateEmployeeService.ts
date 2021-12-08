import { compare } from "bcryptjs";
import { AppError } from "errors/appError";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IAuthenticateEmployeeDto } from "@employees/dtos/iAuthenticateEmployeeDto";
import { IEmployeeRepository } from "@employees/repositories/iEmployeeRepository";

interface IToken {
  token: string;
}

@injectable()
export class AuthenticateEmployeeService {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,
  ) { }

  async execute({ email, password }: IAuthenticateEmployeeDto): Promise<IToken> {
    const messageAuthenticateInvalid = "Email ou senha inválido";

    const employee = await this.employeeRepository.findOneEmail(email);

    if (!employee) {
      throw new AppError(messageAuthenticateInvalid);
    }

    const passwordMatch = await compare(password, employee.password);

    if (!passwordMatch) {
      throw new AppError(messageAuthenticateInvalid);
    }

    const token = sign(
      {
        name: employee.name,
        email: employee.email,
        avatarUrl: employee.avatarUrl,
        isAdmin: employee.isAdmin,
      },
      "fa5473530e4d1a5a1e1eb53d2fedb10c",
      {
        subject: employee.id,
        expiresIn: "5d",
      },
    );

    return { token };
  }
}
