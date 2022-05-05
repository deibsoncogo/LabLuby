import { Test, TestingModule } from "@nestjs/testing";
import { response } from "express";
import { UserController } from "./user.controller";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

describe("User controller", () => {
  let controller: UserController;
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            findUsers: jest.fn(),
            findIdUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
            hasEmailAlreadyExistsUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  test("It should be possible to run the definition successfully", () => {
    expect(controller).toBeDefined();
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("Method findUsers", () => {
    test("It should be possible to run the method successfully", async () => {
      const result = await controller.findUsers(response);

      expect(result).toEqual("dd");
    });
  });
});
