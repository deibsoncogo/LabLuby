import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateUserDto } from "./dto/createUser.dto";
import { IdUserDto } from "./dto/idUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserResolver } from "./user.resolver";

@Controller("user")
export class UserController {
  constructor(private resolve: UserResolver) {}

  @Post()
  async createUser(@Body() body: CreateUserDto, @Res() response: Response): Promise<Response> {
    const { name, email, password } = body;
    return response.status(201).json(await this.resolve.createUser({ name, email, password }));
  }

  @Get()
  async findUsers(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolve.findUsers());
  }

  @Get(":id")
  async findIdUser(@Param() param: IdUserDto, @Res() response: Response): Promise<Response> {
    const { id } = param;
    return response.status(200).json(await this.resolve.findIdUser(id));
  }

  @Put(":id")
  async updateUser(
    @Param() param: IdUserDto,
    @Query() query: UpdateUserDto,
    @Res() response: Response,
  ): Promise<Response> {
    const { id } = param;
    const { name, email, password } = query;

    return response.status(201).json(await this.resolve.updateUser(id, { name, email, password }));
  }

  @Delete(":id")
  async deleteUser(@Param() param: IdUserDto, @Res() response: Response): Promise<Response> {
    const { id } = param;
    return response.status(205).json(await this.resolve.deleteUser(id));
  }
}
