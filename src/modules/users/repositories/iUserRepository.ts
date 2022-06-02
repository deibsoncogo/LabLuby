import { ICreateUserDto } from '../dtos/iCreateUserDto'
import { UserEntity } from '../entities/userEntity'

export interface IUserRepository {
  findEmailUser(email: string): Promise<UserEntity>
  findCpfUser(cpf: number): Promise<UserEntity>
  createUser(data: ICreateUserDto): Promise<UserEntity>
}
