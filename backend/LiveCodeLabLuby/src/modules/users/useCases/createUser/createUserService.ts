import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/appError'
import { ICreateUserDto } from '../../dtos/iCreateUserDto'
import { UserEntity } from '../../entities/userEntity'
import { IUserRepository } from '../../repositories/iUserRepository'

@injectable()
export class CreateUserService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDto): Promise<UserEntity> {
    const cpfAlreadyExists = await this.userRepository.findCpfUser(data.cpf)

    if (cpfAlreadyExists) {
      throw new AppError('Já existe um usuário com este CPF', 409)
    }

    const emailAlreadyExists = await this.userRepository.findEmailUser(data.email)

    if (emailAlreadyExists) {
      throw new AppError('Já existe um usuário com este e-mail', 409)
    }

    const passwordHash = await hash(data.password, 8)

    if (!passwordHash) {
      throw new AppError('Erro inesperado ao criptografar a senha do usuário', 500)
    }

    data.password = passwordHash

    const user = await this.userRepository.createUser(data)

    delete user.password

    return user
  }
}
