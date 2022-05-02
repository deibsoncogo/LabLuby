import { Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    await this.hasEmailAlreadyExistsUser(data.email);

    const user = await this.database.users.create({ data });

    if (!user) {
      throw new InternalServerErrorException("Erro inesperado ao criar o usuário");
    }

    return user;
  }

  async findUsers(): Promise<UserEntity[]> {
    const users = await this.database.users.findMany({ orderBy: { created_at: "asc" } });

    if (!users) {
      throw new InternalServerErrorException("Erro inesperado ao buscar todos usuários");
    }

    return users;
  }

  async findIdUser(id: string): Promise<UserEntity> {
    const user = await this.database.users.findUnique({
      where: { id },
      include: { Users_Rules: { include: { rule: true } } },
    });

    if (!user) {
      throw new NotAcceptableException("Não foi encontrado nenhum usuário com este ID");
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserEntity> {
    await this.findIdUser(id);
    await this.hasEmailAlreadyExistsUser(data.email);

    const user = await this.database.users.update({ where: { id }, data });

    if (!user) {
      throw new InternalServerErrorException("Erro inesperado ao atualizar o usuário");
    }

    return user;
  }

  async deleteUser(id: string): Promise<UserEntity> {
    await this.findIdUser(id);

    const user = await this.database.users.delete({ where: { id } });

    if (!user) {
      throw new InternalServerErrorException("Erro inesperado ao excluir o usuário");
    }

    return user;
  }

  async hasEmailAlreadyExistsUser(email: string): Promise<boolean> {
    const user = await this.database.users.findUnique({ where: { email } });

    if (user) {
      throw new NotAcceptableException("Já existe um usuário com este e-mail registrado");
    }

    return false;
  }
}
