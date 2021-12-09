import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { EmployeeRepository } from "../modules/employees/repositories/employeeRepository";

export async function EmployeeIsAdminMiddleware(
  request: Request, response: Response, next: NextFunction,
): Promise<void> {
  const { idEmployeeAuthorized } = request;

  const employeeRepository = new EmployeeRepository();

  const employee = await employeeRepository.findOneId(idEmployeeAuthorized);

  if (!employee) {
    throw new AppError("ID do funcionário autorizado inválido!", 401);
  }

  request.employeeIsAdmin = employee.isAdmin;

  return next();
}
