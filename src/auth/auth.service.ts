import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { DatabaseService } from "src/database/database.service";
import { AuthEntity } from "./auth.entity";
import { CreateAuthDto } from "./dto/createAuth.dto";
import { PayloadDto } from "./dto/payload.dto";

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService, private jwtService: JwtService) {}

  async createAuth(data: CreateAuthDto): Promise<AuthEntity> {
    const user = await this.databaseService.users.findUnique({
      where: { email: data.email },
      include: { Users_Rules: { include: { rule: true } } },
    });

    if (user) {
      if (await compare(data.password, user.password)) {
        const payload: PayloadDto = {
          sub: user.id,
          userName: user.name,
        };

        const token = await this.jwtService.signAsync(payload);

        const rules = [];

        user.Users_Rules.forEach((userRule) => {
          rules.push(userRule.rule);
        });

        return { token, user, rules };
      }
    }

    throw new UnauthorizedException("Credencial inválida");
  }
}
