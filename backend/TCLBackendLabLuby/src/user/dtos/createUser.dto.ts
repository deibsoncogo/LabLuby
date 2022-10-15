import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateUserDto {
  @IsString({ message: 'Deve ser do tipo texto' })
  @IsNotEmpty({ message: 'Deve ser informado um valor' })
  @Field(() => String)
    name: string

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 }, { message: 'Deve ser do tipo número' })
  @IsNotEmpty({ message: 'Deve ser informado um valor' })
  @Field(() => Number)
    cpf: number

  @IsString({ message: 'Deve ser do tipo texto' })
  @IsNotEmpty({ message: 'Deve ser informado um valor' })
  @IsEmail({}, { message: 'Formato do e-mail inválido' })
  @Field(() => String)
    email: string

  @IsString({ message: 'Deve ser do tipo texto' })
  @IsNotEmpty({ message: 'Deve ser informado um valor' })
  @Field(() => String)
    password: string
}
