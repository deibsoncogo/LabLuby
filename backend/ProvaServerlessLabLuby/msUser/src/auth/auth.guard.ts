import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { AccessLevels } from "./accessLevel.decorator"
import { PayloadDto } from "./dto/payload.dto"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<string>("AccessLevel", context.getHandler())

    if (role === AccessLevels.Public) {
      return true
    }

    try {
      const request = await context.switchToHttp().getRequest()

      const [, token] = request.headers.authorization.split(" ")

      const payload: PayloadDto = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
        ignoreExpiration: false,
      })

      request.payload = payload
    } catch (error) {
      throw new UnauthorizedException("Token inválido")
    }

    return true
  }
}
