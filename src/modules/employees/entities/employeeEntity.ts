import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v1 as uuid } from "uuid";

@Entity("employees")
export class EmployeeEntity {
  @PrimaryColumn()
    id: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @Column()
    name: string;

  @Column()
    cpf: number;

  @Column()
    email: string;

  @Column()
    password: string;

  @Column()
    isAdmin: boolean;

  @Column()
    isOff: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.isAdmin = false;
      this.isOff = false;
    }
  }
}
