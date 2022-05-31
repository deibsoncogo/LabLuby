import { Response } from "express"
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common"
import { CreateUserDto } from "./dto/createUser.dto"
import { IdUserDto } from "./dto/idUser.dto"
import { UpdateUserDto } from "./dto/updateUser.dto"
import { UserService } from "./user.service"

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto, @Res() response: Response): Promise<Response> {
    const { name, cpf, email, password } = body
    return response.status(201).json(await this.userService.createUser({ name, cpf, email, password }))
  }

  @Get()
  async findUsers(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.userService.findUsers())
  }

  @Get(":id")
  async findIdUser(@Param() param: IdUserDto, @Res() response: Response): Promise<Response> {
    const { id } = param
    return response.status(200).json(await this.userService.findIdUser(id))
  }

  @Put(":id")
  async updateUser(
    @Param() param: IdUserDto,
    @Body() body: UpdateUserDto,
    @Res() response: Response,
  ): Promise<Response> {
    const { id } = param
    const { name, cpf, email, password } = body

    return response.status(201).json(await this.userService.updateUser(id, { name, cpf, email, password }))
  }

    @Delete(":id")
  async deleteUser(@Param() param: IdUserDto, @Res() response: Response): Promise<Response> {
    const { id } = param
    return response.status(205).json(await this.userService.deleteUser(id))
  }
}
