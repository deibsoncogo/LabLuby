import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AccessLevel, AccessLevels } from "src/auth/accessLevel.decorator";
import { CreateRuleDto } from "./dto/createRule.dto";
import { UpdateRuleDto } from "./dto/updateRule.dto";
import { RuleEntity } from "./rule.entity";
import { RuleService } from "./rule.service";

@Resolver()
export class RuleResolver {
  constructor(private service: RuleService) {}

  @AccessLevel(AccessLevels.Admin)
  @Mutation(() => RuleEntity)
  async createRule(@Args("data") data: CreateRuleDto): Promise<RuleEntity> {
    const rule = await this.service.createRule(data);
    return rule;
  }

  @AccessLevel(AccessLevels.Admin)
  @Query(() => [RuleEntity])
  async findRules(): Promise<RuleEntity[]> {
    const rules = await this.service.findRules();
    return rules;
  }

  @AccessLevel(AccessLevels.Admin)
  @Query(() => RuleEntity)
  async findIdRule(@Args("id") id: string): Promise<RuleEntity> {
    const rule = await this.service.findIdRule(id);
    return rule;
  }

  @AccessLevel(AccessLevels.Admin)
  @Mutation(() => RuleEntity)
  async updateRule(@Args("id") id: string, @Args("data") data: UpdateRuleDto): Promise<RuleEntity> {
    const rule = await this.service.updateRule(id, data);
    return rule;
  }

  @AccessLevel(AccessLevels.Admin)
  @Mutation(() => RuleEntity)
  async deleteRule(@Args("id") id: string): Promise<RuleEntity> {
    const rule = await this.service.deleteRule(id);
    return rule;
  }
}
