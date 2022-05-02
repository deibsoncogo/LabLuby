import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsString({ message: "Deve ser do tipo texto" })
  @IsEmail({}, { message: "Formato do e-mail inválido" })
  @Field(() => String)
  email?: string;

  @IsOptional()
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsString({ message: "Deve ser do tipo texto" })
  @Field(() => String)
  password?: string;
}
