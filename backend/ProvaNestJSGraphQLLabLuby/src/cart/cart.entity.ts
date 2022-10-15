import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Carts } from "@prisma/client";

@ObjectType()
export class CartEntity implements Carts {
  @Field(() => ID)
  id: string;

  min_value: number;

  created_at: Date;

  updated_at: Date;
}
