import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class CreateBetDto {
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsUUID("4", { message: "Formato do ID inválido" })
  @Field(() => String)
  user_id: string;

  @Field(() => [IBet])
  bets: IBet[];
}

@InputType()
export class IBet {
  @Field(() => String)
  items: string;

  @Field(() => String)
  game_id: string;
}
