import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "src/database/database.service";
import { UserEntity } from "src/user/user.entity";
import { CreateAuthDto } from "./dto/createAuth.dto";
import { compare } from "bcryptjs";

type IReturn = {
  token: string;
  user: UserEntity;
};

@Injectable()
export class AuthService {
  constructor(private database: DatabaseService, private jwtService: JwtService) {}

  async createAuth(data: CreateAuthDto): Promise<IReturn> {
    const user = await this.database.users.findUnique({
      where: { email: data.email },
      include: { Users_Rules: { include: { rule: true } } },
    });

    const passwordCompare = await compare(data.password, user.password);

    if (!user || !passwordCompare) {
      throw new UnauthorizedException("Credencial inválida");
    }

    const token = await this.jwtService.signAsync({
      name: user.name,
      email: user.email,
      sub: user.id,
    });

    delete user.password;

    return { token, user };
  }

  async validateAuth(token: string): Promise<object> {
    const [, code] = token.split(" ");

    try {
      const payload = await this.jwtService.verifyAsync(code);

      return payload;
    } catch (error) {
      throw new UnauthorizedException("Token inválido");
    }
  }
}
