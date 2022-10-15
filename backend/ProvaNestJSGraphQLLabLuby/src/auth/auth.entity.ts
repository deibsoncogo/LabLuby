import { Field, ObjectType } from "@nestjs/graphql";
import { RuleEntity } from "src/rule/rule.entity";
import { UserEntity } from "src/user/user.entity";

@ObjectType()
export class AuthEntity {
  @Field(() => String)
  token: string;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => [RuleEntity])
  rules: RuleEntity[];
}
