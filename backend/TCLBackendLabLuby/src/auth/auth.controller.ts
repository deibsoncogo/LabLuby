import { Request, Response } from 'express'
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dtos/createAuth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async createAuth(@Body() data:CreateAuthDto, @Res() response: Response): Promise<Response> {
    return response.status(201).json(await this.authService.createAuth(data))
  }

  @Get()
  async validateAuth(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { authorization } = request.headers

    console.log('authorization =>', typeof authorization, authorization)

    const [, token] = authorization.split(' ')

    return response.status(200).json(await this.authService.validateAuth(token))
  }
}
