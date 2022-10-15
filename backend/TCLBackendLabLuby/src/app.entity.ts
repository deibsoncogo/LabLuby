import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AppEntity {
  @Field(() => String)
    message: string
}
