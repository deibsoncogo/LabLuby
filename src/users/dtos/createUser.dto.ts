import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateUserDto {
  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  @IsString({ message: "É permitido somente texto" })
  @Field(() => String)
  name: string;

  @IsNotEmpty({ message: "Este campo não pode estar vazio" })
  @IsEmail({ message: "Formato do e-mail inválido" })
  @Field(() => String)
  email: string;
}
