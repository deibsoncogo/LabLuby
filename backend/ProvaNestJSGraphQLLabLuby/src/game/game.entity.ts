import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Games } from "@prisma/client";
import { BetEntity } from "../bet/bet.entity";

@ObjectType()
export class GameEntity implements Games {
  @Field(() => ID)
  id: string;

  name: string;

  description: string;

  range: number;

  price: number;

  max_number: number;

  color: string;

  created_at: Date;

  updated_at: Date;

  Bets?: BetEntity[];
}
