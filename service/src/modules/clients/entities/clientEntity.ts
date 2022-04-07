import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("clients")
export class ClientEntity {
  @PrimaryColumn()
    id: string;

  @Column()
    full_name: string;

  @Column()
    email: string;

  @Column()
    password: string;

  @Column()
    phone: number;

  @Column()
    cpf_numeric: number;

  @Column()
    address: string;

  @Column()
    city: string;

  @Column()
    state: string;

  @Column()
    zip_code: number;

  @Column()
    average_salary: number;

  @Column()
    current_balance: number;

  @Column()
    status: string;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.created_at = new Date();
      this.updated_at = new Date();
    }
  }
}
