import { getRepository, Repository } from 'typeorm'
import { AppError } from '../../../errors/appError'
import { ICreateUserDto } from '../dtos/iCreateUserDto'
import { IFindUserDto } from '../dtos/iFindUserDto'
import { UserEntity } from '../entities/userEntity'
import { IUserRepository } from './iUserRepository'

export class UserRepository implements IUserRepository {
  private userRepository: Repository<UserEntity>

  constructor() { this.userRepository = getRepository(UserEntity) }

  findEmailUser(email: string): Promise<UserEntity> {
    const userFindOne = this.userRepository.findOne({ email })

    if (!userFindOne) {
      throw new AppError('Não foi encontrado um usuário com este e-mail', 404)
    }

    return userFindOne
  }

  async findCpfUser(cpf: number): Promise<UserEntity> {
    const userFindOne = this.userRepository.findOne({ cpf })

    if (!userFindOne) {
      throw new AppError('Não foi encontrado um usuário com este CPF', 404)
    }

    return userFindOne
  }

  async findUser(data: IFindUserDto): Promise<UserEntity> {
    const userFindOne = this.userRepository.findOne({ id: data.id })

    if (!userFindOne) {
      throw new AppError('Não foi encontrado um usuário com este ID', 404)
    }

    return userFindOne
  }

  async findUsers(): Promise<UserEntity[]> {
    const usersFind = await this.userRepository.find()

    if (!usersFind) {
      throw new AppError('Erro inesperado ao buscar todos usuários', 500)
    }

    return usersFind
  }

  async createUser(data: ICreateUserDto): Promise<UserEntity> {
    const userCreate = this.userRepository.create(data)

    if (!userCreate) {
      throw new AppError('Erro inesperado ao criar o usuário', 500)
    }

    const userSave = await this.userRepository.save(data)

    if (!userSave) {
      throw new AppError('Erro inesperado ao salvar o usuário', 500)
    }

    return userSave
  }
}
