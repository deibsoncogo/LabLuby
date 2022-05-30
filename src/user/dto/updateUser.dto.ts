import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

@InputType()
export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
    name?: string

  @IsOptional()
  @IsNumber({}, { message: "Deve ser do tipo número" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
    cpf?: number

  @IsOptional()
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsEmail({}, { message: "Formato do e-mail inválido" })
  @Field(() => String)
    email?: string

  @IsOptional()
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
    password?: string
}
