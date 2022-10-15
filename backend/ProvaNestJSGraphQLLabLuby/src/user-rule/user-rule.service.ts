import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateUserRuleDto } from "./dto/createUserRule.dto";
import { DeleteUserRuleDto } from "./dto/deleteUserRule.dto";
import { UserRuleEntity } from "./user-rule.entity";

@Injectable()
export class UserRuleService {
  constructor(private database: DatabaseService) {}

  async createUserRule(data: CreateUserRuleDto): Promise<UserRuleEntity> {
    const userRule = await this.database.users_Rules.create({ data });

    return userRule;
  }

  async findUsersRules(): Promise<UserRuleEntity[]> {
    const usersRules = await this.database.users_Rules.findMany({
      orderBy: { created_at: "desc" },
      include: { user: true, rule: true },
    });

    usersRules.forEach((userRule) => {
      delete userRule.user.password;
    });

    return usersRules;
  }

  async deleteUserRule(data: DeleteUserRuleDto): Promise<UserRuleEntity> {
    const userRuleFind = await this.database.users_Rules.findFirst({
      where: { user_id: data.user_id, rule_id: data.rule_id },
    });

    const userRule = await this.database.users_Rules.delete({ where: { id: userRuleFind.id } });

    return userRule;
  }
}
