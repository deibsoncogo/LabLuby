import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

@InputType()
export class FindUserDto {
  @IsOptional()
  @IsString({ message: 'Deve ser do tipo texto' })
  @IsNotEmpty({ message: 'Deve ser informado um valor' })
  @IsUUID('4', { message: 'Formato do ID inválido' })
  @Field(() => String, { nullable: true })
    id?: string

  @IsOptional()
  @IsString({ message: 'Deve ser do tipo texto' })
  @IsNotEmpty({ message: 'Deve ser informado um valor' })
  @Field(() => String, { nullable: true })
    name?: string

  @IsOptional()
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 }, { message: 'Deve ser do tipo número' })
  @IsNotEmpty({ message: 'Deve ser informado um valor' })
  @Field(() => Number, { nullable: true })
    cpf?: number

  @IsOptional()
  @IsString({ message: 'Deve ser do tipo texto' })
  @IsNotEmpty({ message: 'Deve ser informado um valor' })
  @IsEmail({}, { message: 'Formato do e-mail inválido' })
  @Field(() => String, { nullable: true })
    email?: string
}
