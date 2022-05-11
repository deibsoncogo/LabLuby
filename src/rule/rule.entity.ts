import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Rules } from "@prisma/client";
import { UserRuleEntity } from "../user-rule/user-rule.entity";

@ObjectType()
export class RuleEntity implements Rules {
  @Field(() => ID)
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  Users_Rules?: UserRuleEntity[];
}
