import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { LocalAuthGuard } from "./guard/local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() request: Request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Req() request: Request) {
    return request.user;
  }
}
