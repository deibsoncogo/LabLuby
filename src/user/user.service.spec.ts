import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TestUtil } from "../common/test/testUtil";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

describe("UserService", () => {
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
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it("It should not be possible to save a user", async () => {
      const userFake = TestUtil.UserFake();
      mockRepository.create.mockReturnValue(userFake);
      mockRepository.save.mockReturnValue(null);

      await service.createUser(userFake).catch((value) => {
        expect(value).toBeInstanceOf(InternalServerErrorException);
        expect(value).toMatchObject({ message: "Problema ao salvar o usuário" });
      });

      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe("Find users", () => {
    it("It must be possible to find all user", async () => {
      const userFake = TestUtil.UserFake();
      mockRepository.find.mockReturnValue([userFake, userFake]);

      const users = await service.findUsers();

      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("Find ID user", () => {
    it("It must be possible to find a user", async () => {
      const userFake = TestUtil.UserFake();
      mockRepository.findOne.mockReturnValue(userFake);

      const user = await service.findIdUser("1");

      expect(user).toMatchObject({ name: userFake.name });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it("It should not be possible to find a user", async () => {
      mockRepository.findOne.mockReturnValue(null);

      expect(service.findIdUser("5")).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
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
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("Delete user", () => {
    it("It must be possible to delete a user", async () => {
      const userFake = TestUtil.UserFake();
      mockRepository.findOne.mockReturnValue(userFake);
      mockRepository.delete.mockReturnValue(userFake);

      const user = await service.deleteUser("1");

      expect(user).toBe(true);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });

    it("It should not be possible to delete a user", async () => {
      const userFake = TestUtil.UserFake();
      mockRepository.findOne.mockReturnValue(userFake);
      mockRepository.delete.mockReturnValue(null);

      const user = await service.deleteUser("111");

      expect(user).toBe(false);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
