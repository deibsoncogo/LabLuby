import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class DeleteUserRuleDto {
  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsString({ message: "Deve ser do tipo texto" })
  @IsUUID("4", { message: "Formato do ID inválido" })
  @Field(() => String)
  user_id: string;

  @IsNotEmpty({ message: "Deve ser informado um valor" })
  @IsString({ message: "Deve ser do tipo texto" })
  @IsUUID("4", { message: "Formato do ID inválido" })
  @Field(() => String)
  rule_id: string;
}
