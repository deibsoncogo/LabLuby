import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRuleDto } from "./dto/createRule.dto";
import { UpdateRuleDto } from "./dto/updateRule.dto";
import { RuleEntity } from "./rule.entity";
import { RuleService } from "./rule.service";

@Resolver()
export class RuleResolver {
  constructor(private service: RuleService) {}

  @Mutation(() => RuleEntity)
  async createRule(@Args("data") data: CreateRuleDto): Promise<RuleEntity> {
    const rule = await this.service.createRule(data);

    return rule;
  }

  @Query(() => [RuleEntity])
  async findRules(): Promise<RuleEntity[]> {
    const rules = await this.service.findRules();

    return rules;
  }

  @Query(() => RuleEntity)
  async findIdRule(@Args("id") id: string): Promise<RuleEntity> {
    const rule = await this.service.findIdRule(id);

    return rule;
  }

  @Mutation(() => RuleEntity)
  async updateRule(@Args("id") id: string, @Args("data") data: UpdateRuleDto): Promise<RuleEntity> {
    const rule = await this.service.updateRule(id, data);

    return rule;
  }

  @Mutation(() => RuleEntity)
  async deleteRule(@Args("id") id: string): Promise<RuleEntity> {
    const rule = await this.service.deleteRule(id);

    return rule;
  }
}
