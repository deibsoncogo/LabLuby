/* eslint-disable indent */
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("employees")
export class EmployeeEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatarUrl: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.isAdmin = false;
    }
  }
}
