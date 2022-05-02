import { Test, TestingModule } from "@nestjs/testing";
import { UserRuleResolver } from "./user-rule.resolver";

describe("UserRuleResolver", () => {
  let resolver: UserRuleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRuleResolver],
    }).compile();

    resolver = module.get<UserRuleResolver>(UserRuleResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
