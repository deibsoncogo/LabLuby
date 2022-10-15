import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'
import { CreateUserDto } from './dtos/createUser.dto'
import { DeleteIdUserDto } from './dtos/deleteIdUser.dto'
import { FindUserDto } from './dtos/findUser.dto'
import { UpdateIdUserDto } from './dtos/updateIdUser.dto'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.databaseService.users.create({ data })
    return user
  }

  async findUsers(): Promise<UserEntity[]> {
    const users = await this.databaseService.users.findMany({ orderBy: { created_at: 'asc' } })
    return users
  }

  async findUser(data: FindUserDto): Promise<UserEntity> {
    const user = await this.databaseService.users.findFirst({ where: data })
    return user
  }

  async updateIdUser(data: UpdateIdUserDto): Promise<UserEntity> {
    const user = await this.databaseService.users.update({ where: { id: data.id }, data })
    return user
  }

  async deleteIdUser(data: DeleteIdUserDto): Promise<UserEntity> {
    const user = await this.databaseService.users.delete({ where: data })
    return user
  }
}
