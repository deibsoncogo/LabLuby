import { InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TestUtil } from "../common/test/testUtil";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

describe("User service", () => {
  let service: UserService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  });

  it("It must be possible to define the service", () => {
    expect(service).toBeDefined();
  });

  describe("Create user", () => {
    it("It must be possible to create a user", async () => {
      const userFake = TestUtil.UserFake();
      mockRepository.create.mockReturnValue(userFake);
      mockRepository.save.mockReturnValue(userFake);

      const user = await service.createUser(userFake);

      expect(user).toMatchObject(userFake);
    });

    it("It should not be possible to create a user", async () => {
      const userFake = TestUtil.UserFake();
      mockRepository.create.mockReturnValue(null);
      mockRepository.save.mockReturnValue(userFake);

      await service.createUser(userFake).catch((error) => {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error).toMatchObject({ message: "Erro ao criar o usuário" });
      });
    });

    it("It should not be possible to save a user", async () => {
      const userFake = TestUtil.UserFake();
      mockRepository.create.mockReturnValue(userFake);
      mockRepository.save.mockReturnValue(null);

      await service.createUser(userFake).catch((error) => {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error).toMatchObject({ message: "Erro ao salvar o usuário" });
      });
    });
  });

  describe("Find users", () => {
    it("It must be possible to find all users", async () => {
      const userFake = TestUtil.UserFake();
      mockRepository.find.mockReturnValue([userFake, userFake]);

      const users = await service.findUsers();

      expect(users).toHaveLength(2);
    });

    it("It should not be possible to find all users", async () => {
      await service.findUsers().catch((error) => {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error).toMatchObject({ message: "Erro ao listar todos usuários" });
      });
    });
  });

  describe("Find ID user", () => {
    it("It must be possible to find a user", async () => {
      const userFake = TestUtil.UserFake();
      mockRepository.findOne.mockReturnValue(userFake);

      const user = await service.findIdUser("1");

      expect(user).toMatchObject(userFake);
    });

    it("It should not be possible to find a user", async () => {
      mockRepository.findOne.mockReturnValue(null);

      await service.findIdUser("5").catch((error) => {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error).toMatchObject({ message: "Usuário não encontrado" });
      });
    });
  });

  describe("Update user", () => {
    it("It must be possible to update a user", async () => {
      const userFake = TestUtil.UserFake();
      const userUpdate = { name: "Nome atualizado" };
      mockRepository.findOne.mockReturnValue(userFake);
      mockRepository.update.mockReturnValue({ ...userFake, ...userUpdate });
      mockRepository.create.mockReturnValue({ ...userFake, ...userUpdate });

      const user = await service.updateUser("1", { ...userFake, ...userUpdate });

      expect(user).toMatchObject(userUpdate);
    });

    it("It should not be possible to update a user", async () => {
      const userFake = TestUtil.UserFake();
      const userUpdate = { name: "Nome atualizado" };
      mockRepository.findOne.mockReturnValue(userFake);
      mockRepository.update.mockReturnValue(null);
      mockRepository.create.mockReturnValue({ ...userFake, ...userUpdate });

      await service.updateUser("1", { ...userFake, ...userUpdate }).catch((error) => {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error).toMatchObject({ message: "Erro ao atualizar o usuário" });
      });
    });

    it("It should not be possible to update/create a user", async () => {
      const userFake = TestUtil.UserFake();
      const userUpdate = { name: "Nome atualizado" };
      mockRepository.findOne.mockReturnValue(userFake);
      mockRepository.update.mockReturnValue({ ...userFake, ...userUpdate });
      mockRepository.create.mockReturnValue(null);

      await service.updateUser("1", { ...userFake, ...userUpdate }).catch((error) => {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error).toMatchObject({ message: "Erro ao atualizar/recriar o usuário" });
      });
    });
  });

  describe("Delete user", () => {
    it("It must be possible to delete a user", async () => {
      const userFake = TestUtil.UserFake();
      mockRepository.findOne.mockReturnValue(userFake);
      mockRepository.delete.mockReturnValue(userFake);

      const user = await service.deleteUser("1");

      expect(user).toBe(undefined);
    });

    it("It should not be possible to delete a user", async () => {
      const userFake = TestUtil.UserFake();
      mockRepository.findOne.mockReturnValue(userFake);
      mockRepository.delete.mockReturnValue(null);

      await service.deleteUser("111").catch((error) => {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error).toMatchObject({ message: "Erro ao excluir o usuário" });
      });
    });
  });
});
