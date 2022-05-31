import { InputType } from "@nestjs/graphql"

@InputType()
export class PayloadDto {
  sub: string

  userName: string

  iat?: number

  exp?: number
}
