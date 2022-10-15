import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { DatabaseService } from 'src/database/database.service'
import { CreateAuthDto } from './dtos/createAuth.dto'

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService, private readonly jwtService: JwtService) {}

  async createAuth(data: CreateAuthDto): Promise<object> {
    const user = await this.databaseService.users.findFirst({ where: data })

    if (user) {
      const token = await this.jwtService.signAsync({ sub: user.id, userName: user.name })

      return { token }
    }

    throw new UnauthorizedException('Credencial inválida')
  }

  async validateAuth(token: string): Promise<object> {
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        { secret: process.env.JWT_SECRET, ignoreExpiration: false },
      )

      return payload
    } catch (error) {
      throw new UnauthorizedException('s')
    }
  }
}
