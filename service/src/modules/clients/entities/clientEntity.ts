import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("clients")
export class ClientEntity {
  @PrimaryColumn()
    id: string;

  @Column({ name: "user_id" })
    userId: string;

  @Column()
    cpf: number;

  @Column()
    phone: number;

  @Column()
    address: string;

  @Column()
    city: string;

  @Column()
    state: string;

  @Column({ name: "zip_code" })
    zipCode: number;

  @Column({ name: "average_salary" })
    averageSalary: number;

  @Column({ name: "current_balance" })
    currentBalance: number;

  @Column()
    status: string;

  @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}
