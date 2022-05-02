import { Controller, Delete, Get, Post, Put, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserResolver } from "./user.resolver";

@Controller("user")
export class UserController {
  constructor(private resolve: UserResolver) {}

  @Post()
  async createUser(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { name, email, password }: CreateUserDto = request.body;
    return response.status(201).json(await this.resolve.createUser({ name, email, password }));
  }

  @Get()
  async findUsers(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolve.findUsers());
  }

  @Get(":id")
  async findIdUser(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;
    return response.status(200).json(await this.resolve.findIdUser(id));
  }

  @Put(":id")
  async updateUser(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { name, email, password }: UpdateUserDto = request.query;
    const { id } = request.params;

    return response.status(201).json(await this.resolve.updateUser(id, { name, email, password }));
  }

  @Delete(":id")
  async deleteUser(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;
    return response.status(205).json(await this.resolve.deleteUser(id));
  }
}
