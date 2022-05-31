import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class AuthEntity {
  @Field(() => String)
    token: string
}
