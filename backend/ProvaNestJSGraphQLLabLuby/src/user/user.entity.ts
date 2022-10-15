import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import { Users } from "@prisma/client";
import { BetEntity } from "../bet/bet.entity";
import { UserRuleEntity } from "../user-rule/user-rule.entity";

@ObjectType()
export class UserEntity implements Users {
  @Field(() => ID)
  id: string;

  name: string;

  email: string;

  @HideField()
  password: string;

  created_at: Date;

  updated_at: Date;

  Users_Rules?: UserRuleEntity[];

  Bets?: BetEntity[];
}
