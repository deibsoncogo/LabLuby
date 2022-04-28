import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserResolver } from "./user.resolver";

@Controller("user")
export class UserController {
  constructor(private userResolver: UserResolver) {}

  @Post("")
  createUser(@Body() data: CreateUserDto) {
    return this.userResolver.createUser(data);
  }

  @Get("")
  findUsers() {
    return this.userResolver.findUsers();
  }

  @Get(":id")
  findUser(@Param() id: string) {
    return this.userResolver.findUser(id);
  }

  @Put(":id")
  updateUser(@Param() id: string, @Query() data: UpdateUserDto) {
    return this.userResolver.updateUser(id, data);
  }

  @Delete(":id")
  deleteUser(@Param() id: string) {
    return this.userResolver.deleteUser(id);
  }
}
