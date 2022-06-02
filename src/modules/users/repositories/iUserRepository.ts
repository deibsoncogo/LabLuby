import { ICreateUserDto } from '../dtos/iCreateUserDto'
import { IFindUserDto } from '../dtos/iFindUserDto'
import { UserEntity } from '../entities/userEntity'

export interface IUserRepository {
  findEmailUser(email: string): Promise<UserEntity>
  findCpfUser(cpf: number): Promise<UserEntity>

  findUser(data: IFindUserDto): Promise<UserEntity>
  findUsers(): Promise<UserEntity[]>
  createUser(data: ICreateUserDto): Promise<UserEntity>
}
