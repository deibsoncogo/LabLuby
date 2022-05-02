import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

@InputType()
export class UpdateCartDto {
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 }, { message: "Deve ser do tipo número" })
  @IsPositive({ message: "Deve ser maior que 0" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => Number)
  min_value?: number;
}
