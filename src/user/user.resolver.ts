import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(private service: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(@Args("data") data: CreateUserDto): Promise<UserEntity> {
    const user = await this.service.createUser(data);
    return user;
  }

  @Query(() => [UserEntity])
  async findUsers(): Promise<UserEntity[]> {
    const users = await this.service.findUsers();
    return users;
  }

  @Query(() => UserEntity)
  async findIdUser(@Args("id") id: string): Promise<UserEntity> {
    const users = await this.service.findIdUser(id);
    return users;
  }

  @Mutation(() => UserEntity)
  async updateUser(@Args("id") id: string, @Args("data") data: UpdateUserDto): Promise<UserEntity> {
    const users = await this.service.updateUser(id, data);
    return users;
  }

  @Mutation(() => UserEntity)
  async deleteUser(@Args("id") id: string): Promise<UserEntity> {
    const users = await this.service.deleteUser(id);
    return users;
  }
}
