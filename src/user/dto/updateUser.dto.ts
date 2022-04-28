import { InputType, Field, ID } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  @IsString({ message: "É permitido somente texto" })
  @Field(() => ID)
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  @IsEmail({ message: "Formato do e-mail inválido" })
  @Field(() => ID)
  email?: string;
}
