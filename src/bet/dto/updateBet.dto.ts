import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

@InputType()
export class UpdateBetDto {
  @IsOptional()
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
  item?: string;

  @IsOptional()
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsUUID("4", { message: "Formato do ID inválido" })
  @Field(() => String)
  user_id?: string;

  @IsOptional()
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsUUID("4", { message: "Formato do ID inválido" })
  @Field(() => String)
  game_id?: string;
}
