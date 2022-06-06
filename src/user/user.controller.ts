import { Response } from 'express'
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common'
import { CreateUserDto } from './dtos/createUser.dto'
import { DeleteIdUserDto } from './dtos/deleteIdUser.dto'
import { FindUserDto } from './dtos/findUser.dto'
import { UpdateIdUserDto } from './dtos/updateIdUser.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto, @Res() response: Response): Promise<Response> {
    return response.status(201).json(await this.userService.createUser(data))
  }

  @Get('all')
  async findUsers(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.userService.findUsers())
  }

  @Get('one')
  async findUser(@Query() data: FindUserDto, @Res() response: Response): Promise<Response> {
    data.cpf = data.cpf && Number(data.cpf)
    return response.status(200).json(await this.userService.findUser(data))
  }

  @Put(':id')
  async updateIdUser(
    @Param() id: string,
    @Query() data: UpdateIdUserDto,
    @Res() response: Response,
  ): Promise<Response> {
    data.id = id
    data.cpf = data.cpf && Number(data.cpf)

    return response.status(201).json(await this.userService.updateIdUser(data))
  }

  @Delete()
  async deleteIdUser(@Param() data: DeleteIdUserDto, @Res() response: Response) {
    return response.status(205).json(await this.userService.deleteIdUser(data))
  }
}
