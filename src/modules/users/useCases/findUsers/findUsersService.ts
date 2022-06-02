import { inject, injectable } from 'tsyringe'
import { UserEntity } from '../../entities/userEntity'
import { IUserRepository } from '../../repositories/iUserRepository'

@injectable()
export class FindUsersService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const users = await this.userRepository.findUsers()

    users.forEach((user) => { delete user.password })

    return users
  }
}
