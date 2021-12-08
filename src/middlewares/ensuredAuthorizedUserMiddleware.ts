import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/appError";

interface IToken {
  name: string;
  email: string;
  avatarUrl: string;
  isAdmin: boolean;
  sub: string;
}

export async function EnsuredAuthorizedUserMiddleware(
  request: Request, response: Response, next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const tokenVerify = verify(token, "fa5473530e4d1a5a1e1eb53d2fedb10c") as IToken;

    const employeeToken = {
      id: tokenVerify.sub,
      name: tokenVerify.name,
      email: tokenVerify.email,
      avatarUrl: tokenVerify.avatarUrl,
      isAdmin: tokenVerify.isAdmin,
    };

    request.employeeToken = employeeToken;

    return next();
  } catch (error) {
    throw new AppError("Token inválido", 401);
  }
}
