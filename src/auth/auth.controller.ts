import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/createAuth.dto";

@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post()
  async createAuth(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { email, password }: CreateAuthDto = request.body;
    return response.status(201).json(await this.service.createAuth({ email, password }));
  }

  @Get()
  async validateAuth(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const token = request.headers.authorization;
    return response.status(200).json(await this.service.validateAuth(token));
  }
}
