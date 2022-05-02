import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsUUID } from "class-validator";

@InputType()
export class CreateUserRuleDto {
  @IsUUID("4", { message: "Formato do ID inválido" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
  user_id: string;

  @IsUUID("4", { message: "Formato do ID inválido" })
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @Field(() => String)
  rule_id: string;
}
