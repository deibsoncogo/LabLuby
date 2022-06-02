import { getRepository, Repository } from 'typeorm'
import { UserEntity } from '../entities/userEntity'
import { IUserRepository } from './iUserRepository'

export class UserRepository implements IUserRepository {
  private userRepository: Repository<UserEntity>

  constructor() { this.userRepository = getRepository(UserEntity) }

  async example(): Promise<object> {
    return { message: 'Method example' }
  }
}
