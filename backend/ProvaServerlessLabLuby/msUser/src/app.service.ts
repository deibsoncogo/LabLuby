import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}

  async findApps(token: string): Promise<object> {
    try {
      const [, tokenEncoded] = token.split(" ")

      const tokenDecoded = await this.jwtService.verifyAsync(tokenEncoded, {
        secret: process.env.JWT_SECRET,
        ignoreExpiration: false,
      })

      return { message: `Bem-vindo ao serverless ${tokenDecoded.userName}!` }
    } catch (error) {
      throw new UnauthorizedException("O token informado não é válido")
    }
  }
}
