import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AccessLevel, AccessLevels } from "src/auth/accessLevel.decorator";
import { CreateUserRuleDto } from "./dto/createUserRule.dto";
import { DeleteUserRuleDto } from "./dto/deleteUserRule.dto";
import { UserRuleEntity } from "./user-rule.entity";
import { UserRuleService } from "./user-rule.service";

@Resolver()
export class UserRuleResolver {
  constructor(private service: UserRuleService) {}

  @AccessLevel(AccessLevels.Admin)
  @Mutation(() => UserRuleEntity)
  async createUserRule(@Args("data") data: CreateUserRuleDto): Promise<UserRuleEntity> {
    const userRule = await this.service.createUserRule(data);
    return userRule;
  }

  @AccessLevel(AccessLevels.Admin)
  @Query(() => [UserRuleEntity])
  async findUsersRules(): Promise<UserRuleEntity[]> {
    const usersRules = await this.service.findUsersRules();
    return usersRules;
  }

  @AccessLevel(AccessLevels.Admin)
  @Mutation(() => UserRuleEntity)
  async deleteUserRule(@Args("data") data: DeleteUserRuleDto): Promise<UserRuleEntity> {
    const userRule = await this.service.deleteUserRule(data);
    return userRule;
  }
}
