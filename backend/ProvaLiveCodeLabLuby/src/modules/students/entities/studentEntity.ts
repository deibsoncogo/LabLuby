import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("students")
export class StudentEntity {
  @PrimaryGeneratedColumn("uuid")
    id: string

  @Column()
    name: string

  @Column()
    phone: number

  @Column()
    email: string

  @Column({ name: "mother_name" })
    motherName: string

  @Column()
    cpf: number

  @CreateDateColumn({ name: "created_at" })
    createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
      this.createdAt = new Date()
      this.updatedAt = new Date()
    }
  }
}
