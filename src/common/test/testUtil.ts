import { UserEntity } from "../../user/user.entity";

export class TestUtil {
  static UserFake(): UserEntity {
    const user = new UserEntity();

    user.id = "1";
    user.name = "Usuário Primeiro";
    user.email = "devprimeiro@outlook.com";

    return user;
  }
}
