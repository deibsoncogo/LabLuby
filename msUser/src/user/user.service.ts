import { Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common"
import { hash } from "bcryptjs"
import { DatabaseService } from "src/database/database.service"
import { CreateUserDto } from "./dto/createUser.dto"
import { UpdateUserDto } from "./dto/updateUser.dto"
import { UserEntity } from "./user.entity"

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    await this.hasCpfAlreadyExistsUser(data.cpf)
    await this.hasEmailAlreadyExistsUser(data.email)

    const passwordHash = await hash(data.password, 8)
    data.password = passwordHash

    const user = await this.database.users.create({ data })

    if (!user) {
      throw new InternalServerErrorException("Erro inesperado ao criar o usuário")
    }

    delete user.password

    return user
  }

  async findUsers(): Promise<UserEntity[]> {
    const users = await this.database.users.findMany({ orderBy: { created_at: "desc" } })

    if (!users) {
      throw new InternalServerErrorException("Erro inesperado ao buscar todos usuários")
    }

    users.forEach((user) => {
      delete user.password
    })

    return users
  }

  async findIdUser(id: string): Promise<UserEntity> {
    const user = await this.database.users.findUnique({ where: { id } })

    if (!user) {
      throw new NotAcceptableException("Não foi encontrado nenhum usuário com este ID")
    }

    delete user.password

    return user
  }

  async findCpfUser(cpf: number): Promise<UserEntity> {
    const user = await this.database.users.findUnique({ where: { cpf } })

    if (!user) {
      throw new NotAcceptableException("Não foi encontrado nenhum usuário com este CPF")
    }

    delete user.password

    return user
  }

  async findEmailUser(email: string): Promise<UserEntity> {
    const user = await this.database.users.findUnique({ where: { email } })

    if (!user) {
      throw new NotAcceptableException("Não foi encontrado nenhum usuário com este e-mail")
    }

    delete user.password

    return user
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserEntity> {
    await this.findIdUser(id)
    await this.hasCpfAlreadyExistsUser(data.cpf)
    await this.hasEmailAlreadyExistsUser(data.email)

    const user = await this.database.users.update({ where: { id }, data })

    if (!user) {
      throw new InternalServerErrorException("Erro inesperado ao atualizar o usuário")
    }

    delete user.password

    return user
  }

  async deleteUser(id: string): Promise<UserEntity> {
    await this.findIdUser(id)

    const user = await this.database.users.delete({ where: { id } })

    if (!user) {
      throw new InternalServerErrorException("Erro inesperado ao excluir o usuário")
    }

    delete user.password

    return user
  }

  async hasCpfAlreadyExistsUser(cpf: number): Promise<boolean> {
    const user = await this.database.users.findUnique({ where: { cpf } })

    if (user) {
      throw new NotAcceptableException("Já existe um usuário com este CPF registrado")
    }

    return false
  }

  async hasEmailAlreadyExistsUser(email: string): Promise<boolean> {
    const user = await this.database.users.findUnique({ where: { email } })

    if (user) {
      throw new NotAcceptableException("Já existe um usuário com este e-mail registrado")
    }

    return false
  }
}
