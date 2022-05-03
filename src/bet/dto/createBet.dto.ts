import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class CreateBetDto {
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsString({ message: "Deve ser do tipo texto" })
  @IsUUID("4", { message: "Formato do ID inválido" })
  @Field(() => String)
  user_id: string;

  @Field(() => [String])
  bets: IBet[];
}

type IBet = {
  items: string;
  game_id: string;
};
