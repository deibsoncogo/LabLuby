import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Rules } from "@prisma/client";

@ObjectType()
export class RuleEntity implements Rules {
  @Field(() => ID)
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;
}
