import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateAuthDto {
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsString({ message: "Deve ser do tipo texto" })
  @IsEmail({}, { message: "Formato do e-mail inválido" })
  @Field(() => String)
  email: string;

  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsString({ message: "Deve ser do tipo texto" })
  @Field(() => String)
  password: string;
}
