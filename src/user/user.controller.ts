import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserResolver } from "./user.resolver";

@Controller("user")
export class UserController {
  constructor(private userResolver: UserResolver) {}

  @Post("")
  async createUser(@Body() data: CreateUserDto, @Res() response: Response): Promise<Response> {
    return response.status(201).json(await this.userResolver.createUser(data));
  }

  @Get("")
  async findUsers(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.userResolver.findUsers());
  }

  @Get(":id")
  async findIdUser(@Param() id: string, @Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.userResolver.findIdUser(id));
  }

  @Put(":id")
  async updateUser(@Param() id: string, @Query() data: UpdateUserDto, @Res() response: Response): Promise<Response> {
    return response.status(201).json(await this.userResolver.updateUser(id, data));
  }

  @Delete(":id")
  async deleteUser(@Param() id: string, @Res() response: Response): Promise<Response> {
    return response.status(205).json(await this.userResolver.deleteUser(id));
  }
}
