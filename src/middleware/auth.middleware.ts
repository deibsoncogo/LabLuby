import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    try {
      const token = request.headers.authorization;

      const [, code] = token.split(" ");

      const payload = await this.jwtService.verifyAsync(code);

      request.userId = payload.sub;

      return next();
    } catch (error) {
      throw new UnauthorizedException("Token inválido");
    }
  }
}
