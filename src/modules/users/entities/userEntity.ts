import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
    id: string

  @Column()
    name: string

  @Column()
    cpf: number

  @Column()
    email: string

  @Column()
    password: string

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
      this.createdAt = new Date()
      this.updatedAt = new Date()
    }
  }
}
