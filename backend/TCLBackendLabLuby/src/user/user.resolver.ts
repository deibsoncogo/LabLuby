import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserDto } from './dtos/createUser.dto'
import { DeleteIdUserDto } from './dtos/deleteIdUser.dto'
import { FindUserDto } from './dtos/findUser.dto'
import { UpdateIdUserDto } from './dtos/updateIdUser.dto'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(@Args('data') data: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.createUser(data)
    return user
  }

  @Query(() => [UserEntity])
  async findUsers(): Promise<UserEntity[]> {
    const users = await this.userService.findUsers()
    return users
  }

  @Query(() => UserEntity)
  async findUser(@Args('data') data: FindUserDto): Promise<UserEntity> {
    const user = await this.userService.findUser(data)
    return user
  }

  @Mutation(() => UserEntity)
  async updateIdUser(@Args('data') data: UpdateIdUserDto): Promise<UserEntity> {
    const user = await this.userService.updateIdUser(data)
    return user
  }

  @Mutation(() => UserEntity)
  async deleteIdUser(@Args('data') data: DeleteIdUserDto): Promise<UserEntity> {
    const user = await this.userService.deleteIdUser(data)
    return user
  }
}
