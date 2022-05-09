import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findEmailUser(email);

    if (user && user.password === password) {
      delete user.password;

      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { userName: user.name, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }
}
