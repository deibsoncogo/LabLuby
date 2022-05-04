import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class IdUserDto {
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsUUID("4", { message: "Formato do ID inválido" })
  @Field(() => String)
  id: string;
}
