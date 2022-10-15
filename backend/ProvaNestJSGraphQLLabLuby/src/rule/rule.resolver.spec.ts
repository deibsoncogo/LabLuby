import { Test, TestingModule } from "@nestjs/testing";
import { RuleResolver } from "./rule.resolver";

describe("RuleResolver", () => {
  let resolver: RuleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuleResolver],
    }).compile();

    resolver = module.get<RuleResolver>(RuleResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
