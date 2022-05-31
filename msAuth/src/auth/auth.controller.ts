import { Response } from "express"
import { Body, Controller, Post, Res } from "@nestjs/common"
import { AuthResolver } from "./auth.resolver"
import { CreateAuthDto } from "./dto/createAuth.dto"

@Controller("auth")
export class AuthController {
  constructor(private resolver: AuthResolver) {}

  @Post()
  async createUser(@Body() body: CreateAuthDto, @Res() response: Response): Promise<Response> {
    const { email, password } = body
    return response.status(201).json(await this.resolver.createAuth({ email, password }))
  }
}
