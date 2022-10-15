import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { compare } from "bcryptjs"
import { DatabaseService } from "../database/database.service"
import { AuthEntity } from "./auth.entity"
import { CreateAuthDto } from "./dto/createAuth.dto"
import { PayloadDto } from "./dto/payload.dto"

@Injectable()
export class AuthService {
  constructor(private database: DatabaseService, private jwt: JwtService) {}

  async createAuth(data: CreateAuthDto): Promise<AuthEntity> {
    const user = await this.database.users.findUnique({ where: { email: data.email } })

    if (user) {
      if (await compare(data.password, user.password)) {
        const payload: PayloadDto = {
          sub: user.id,
          userName: user.name,
        }

        const token = await this.jwt.signAsync(payload)

        return { token }
      }
    }

    throw new UnauthorizedException("Credencial inválida")
  }
}
