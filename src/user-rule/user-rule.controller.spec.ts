import { Test, TestingModule } from "@nestjs/testing";
import { UserRuleController } from "./user-rule.controller";

describe("UserRuleController", () => {
  let controller: UserRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRuleController],
    }).compile();

    controller = module.get<UserRuleController>(UserRuleController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
