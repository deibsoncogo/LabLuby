import { Response } from "express"
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common"
import { AccessLevel, AccessLevels } from "../auth/accessLevel.decorator"
import { CreateUserDto } from "./dto/createUser.dto"
import { IdUserDto } from "./dto/idUser.dto"
import { UpdateUserDto } from "./dto/updateUser.dto"
import { UserService } from "./user.service"

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @AccessLevel(AccessLevels.Public)
  async createUser(@Body() body: CreateUserDto, @Res() response: Response): Promise<Response> {
    const { name, cpf, email, password } = body
    return response.status(201).json(await this.userService.createUser({ name, cpf, email, password }))
  }

  @Get()
  @AccessLevel(AccessLevels.Private)
  async findUsers(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.userService.findUsers())
  }

  @Get(":id")
  @AccessLevel(AccessLevels.Private)
  async findIdUser(@Param() param: IdUserDto, @Res() response: Response): Promise<Response> {
    const { id } = param
    return response.status(200).json(await this.userService.findIdUser(id))
  }

  @Put(":id")
  @AccessLevel(AccessLevels.Private)
  async updateUser(
    @Param() param: IdUserDto,
    @Query() query: UpdateUserDto,
    @Res() response: Response,
  ): Promise<Response> {
    const { id } = param
    const data = query

    return response.status(201).json(await this.userService.updateUser(id, data))
  }

  @Delete(":id")
  @AccessLevel(AccessLevels.Private)
  async deleteUser(@Param() param: IdUserDto, @Res() response: Response): Promise<Response> {
    const { id } = param
    return response.status(205).json(await this.userService.deleteUser(id))
  }
}
