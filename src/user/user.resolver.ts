import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(@Args("data") data: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.createUser(data);
    return user;
  }

  @Query(() => [UserEntity])
  async findUsers(): Promise<UserEntity[]> {
    const users = await this.userService.findUsers();
    return users;
  }

  @Query(() => UserEntity)
  async findIdUser(@Args("id") id: string): Promise<UserEntity> {
    const user = await this.userService.findIdUser(id);
    return user;
  }

  @Mutation(() => UserEntity)
  async updateUser(@Args("id") id: string, @Args("data") data: UpdateUserDto): Promise<UserEntity> {
    const user = this.userService.updateUser(id, data);
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args("id") id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
