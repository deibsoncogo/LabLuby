import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { EmployeeRepository } from "../modules/employees/repositories/employeeRepository";

export async function EmployeeIsAdminMiddleware(
  request: Request, response: Response, next: NextFunction,
): Promise<void> {
  const { idEmployeeAuthorized } = request;

  const employeeRepository = new EmployeeRepository();

  const employee = await employeeRepository.findOneIdEmployee(idEmployeeAuthorized);

  if (!employee) {
    throw new AppError("ID do funcionário autenticado inválido!", 401);
  }

  if (!employee.isAdmin) {
    throw new AppError("Funcionário autenticado não é administrador!", 401);
  }

  return next();
}
