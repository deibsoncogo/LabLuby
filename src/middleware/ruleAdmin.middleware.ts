import { ForbiddenException, Injectable, InternalServerErrorException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class RuleAdminMiddleware implements NestMiddleware {
  constructor(private database: DatabaseService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    let isAuthorized = false;

    const user = await this.database.users.findUnique({
      where: { id: request.userId },
      include: { Users_Rules: { include: { rule: true } } },
    });

    if (!user) {
      throw new InternalServerErrorException("Erro inesperado ao buscar o usuário");
    }

    if (user.Users_Rules.length === 0) {
      throw new ForbiddenException("O usuário não possui nenhum nível de acesso");
    }

    user.Users_Rules.forEach((rule) => {
      if (rule.rule.name === "admin") {
        isAuthorized = true;
      }
    });

    if (!isAuthorized) {
      throw new ForbiddenException("Usuário não autorizado");
    }

    return next();
  }
}
