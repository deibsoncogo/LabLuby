import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Bets } from "@prisma/client";
import { GameEntity } from "src/game/game.entity";
import { UserEntity } from "src/user/user.entity";

@ObjectType()
export class BetEntity implements Bets {
  @Field(() => ID)
  id: string;

  item: string;

  user_id: string;

  game_id: string;

  created_at: Date;

  updated_at: Date;

  user?: UserEntity;

  game?: GameEntity;
}
