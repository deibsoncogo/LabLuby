import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Users_Rules } from "@prisma/client";
import { RuleEntity } from "src/rule/rule.entity";
import { UserEntity } from "src/user/user.entity";

@ObjectType()
export class UserRuleEntity implements Users_Rules {
  @Field(() => ID)
  id: string;

  user_id: string;

  rule_id: string;

  created_at: Date;

  updated_at: Date;

  user?: UserEntity;

  rule?: RuleEntity;
}
