import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { request } from "express";
import { DatabaseService } from "src/database/database.service";
import { AccessLevels } from "./accessLevel.decorator";
import { PayloadDto } from "./dto/payload.dto";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<string>("AccessLevel", context.getHandler());

    if (role === AccessLevels.Public) {
      return true;
    }

    let payload: PayloadDto;

    try {
      const { req } = context.switchToHttp().getNext();

      const [, token] = req.rawHeaders[7].split(" ");

      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
        ignoreExpiration: false,
      });
    } catch (error) {
      throw new UnauthorizedException("Token inválido");
    }

    const user = await this.databaseService.users.findUnique({
      where: { id: payload.sub },
      include: { Users_Rules: { include: { rule: true } } },
    });

    if (!user) {
      throw new ForbiddenException("Erro ao autorizar o usuário");
    }

    let userAuthorized = false;

    user.Users_Rules.forEach((userRule) => {
      if (role === userRule.rule.name) {
        userAuthorized = true;
      }
    });

    if (userAuthorized) {
      request.payload = payload;
      return true;
    }

    throw new ForbiddenException("Acesso não autorizado");
  }
}
