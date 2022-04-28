import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
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

    const userSave = await this.userRepository.save(user);

    if (!userSave) {
      throw new InternalServerErrorException("Problema ao salvar o usuário");
    }

    return user;
  }

  async findUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findIdUser(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findIdUser(id);

    await this.userRepository.update(user, { ...data });

    const userUpdate = await this.userRepository.create({ ...user, ...data });

    return userUpdate;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findIdUser(id);

    const userDelete = await this.userRepository.delete(user);

    if (userDelete) {
      return true;
    }

    return false;
  }
}
