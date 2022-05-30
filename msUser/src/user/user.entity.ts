import { Field, HideField, ID, ObjectType } from "@nestjs/graphql"
import { Users } from "@prisma/client"

@ObjectType()
export class UserEntity implements Users {
  @Field(() => ID)
    id: string

  name: string

  cpf: number

  email: string

  @HideField()
    password: string

  created_at: Date

  updated_at: Date
}
