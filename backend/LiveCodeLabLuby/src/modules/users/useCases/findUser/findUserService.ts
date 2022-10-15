import { inject, injectable } from 'tsyringe'
import { IFindUserDto } from '../../dtos/iFindUserDto'
import { UserEntity } from '../../entities/userEntity'
import { IUserRepository } from '../../repositories/iUserRepository'

@injectable()
export class FindUserService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  async execute(data: IFindUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findUser(data)

    delete user.password

    return user
  }
}
