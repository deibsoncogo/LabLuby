/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export async function ErrorMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json(
      { message: error.message },
    );
  }

  return response.status(500).json(
    { message: `Erro interno do servidor - ${error.message}` },
  );
}
