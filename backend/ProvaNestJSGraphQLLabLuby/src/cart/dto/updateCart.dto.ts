import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";

@InputType()
export class UpdateCartDto {
  @IsOptional()
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 }, { message: "Deve ser do tipo número" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsPositive({ message: "Deve ser maior que 0" })
  @Field(() => Number)
  min_value?: number;
}
