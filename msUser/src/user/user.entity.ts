import { Users } from "@prisma/client"

export class UserEntity implements Users {
  id: string

  name: string

  cpf: number

  email: string

  password: string

  created_at: Date

  updated_at: Date
}
