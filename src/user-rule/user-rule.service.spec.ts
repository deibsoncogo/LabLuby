import { Test, TestingModule } from "@nestjs/testing";
import { UserRuleService } from "./user-rule.service";

describe("UserRuleService", () => {
  let service: UserRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRuleService],
    }).compile();

    service = module.get<UserRuleService>(UserRuleService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
