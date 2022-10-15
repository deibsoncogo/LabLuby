import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

@InputType()
export class CreateCartDto {
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 }, { message: "Deve ser do tipo número" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsPositive({ message: "Deve ser maior que 0" })
  @Field(() => Number)
  min_value: number;
}
