import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/appError";

interface IToken {
  name: string;
  sub: string;
}

export async function EnsuredAuthorizedMiddleware(
  request: Request, response: Response, next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const tokenVerify = verify(token, "fa5473530e4d1a5a1e1eb53d2fedb10c") as IToken;

    request.idEmployeeAuthorized = tokenVerify.sub;

    return next();
  } catch (error) {
    throw new AppError("Token inválido", 401);
  }
}
