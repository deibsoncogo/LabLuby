import { Response } from "express"
import { Body, Controller, Post, Res } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CreateAuthDto } from "./dto/createAuth.dto"

@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post()
  async createAuth(@Body() body: CreateAuthDto, @Res() response: Response): Promise<Response> {
    const { email, password } = body
    return response.status(201).json(await this.service.createAuth({ email, password }))
  }
}
