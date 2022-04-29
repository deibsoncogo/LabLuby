import { Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.create(data);

    if (!user) {
      throw new InternalServerErrorException("Erro ao criar o usuário");
    }

    const userSave = await this.userRepository.save(user);

    if (!userSave) {
      throw new InternalServerErrorException("Erro ao salvar o usuário");
    }

    return user;
  }

  async findUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();

    if (!users) {
      throw new InternalServerErrorException("Erro ao listar todos usuários");
    }

    return users;
  }

  async findIdUser(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotAcceptableException("Usuário não encontrado");
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findIdUser(id);

    const userUpdate = await this.userRepository.update(user, { ...data });

    if (!userUpdate) {
      throw new InternalServerErrorException("Erro ao atualizar o usuário");
    }

    const userCreate = await this.userRepository.create({ ...user, ...data });

    if (!userCreate) {
      throw new InternalServerErrorException("Erro ao atualizar/recriar o usuário");
    }

    return userCreate;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.findIdUser(id);

    const userDelete = await this.userRepository.delete(user);

    console.log("userDelete =>", typeof userDelete, userDelete);

    if (!userDelete) {
      throw new InternalServerErrorException("Erro ao excluir o usuário");
    }
  }
}
