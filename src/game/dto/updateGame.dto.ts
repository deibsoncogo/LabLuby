import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

@InputType()
export class UpdateGameDto {
  @IsOptional()
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
  name?: string;

  @IsOptional()
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
  description?: string;

  @IsOptional()
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 }, { message: "Deve ser do tipo número" })
  @IsPositive({ message: "Deve ser maior que 0" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => Number)
  range?: number;

  @IsOptional()
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 }, { message: "Deve ser do tipo número" })
  @IsPositive({ message: "Deve ser maior que 0" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => Number)
  price?: number;

  @IsOptional()
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 }, { message: "Deve ser do tipo número" })
  @IsPositive({ message: "Deve ser maior que 0" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => Number)
  max_number?: number;

  @IsOptional()
  @IsString({ message: "Deve ser do tipo texto" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
  color?: string;
}
