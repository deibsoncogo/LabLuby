import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

@InputType()
export class CreateGameDto {
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
  name: string;

  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
  description: string;

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 }, { message: "Deve ser do tipo número" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsPositive({ message: "Deve ser maior que 0" })
  @Field(() => Number)
  range: number;

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 }, { message: "Deve ser do tipo número" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsPositive({ message: "Deve ser maior que 0" })
  @Field(() => Number)
  price: number;

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 }, { message: "Deve ser do tipo número" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsPositive({ message: "Deve ser maior que 0" })
  @Field(() => Number)
  max_number: number;

  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
  color: string;
}
