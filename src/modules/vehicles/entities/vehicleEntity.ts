import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v1 as uuid } from "uuid";
import { EmployeeEntity } from "../../employees/entities/employeeEntity";

@Entity("vehicles")
export class VehicleEntity {
  @PrimaryColumn()
    id: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @Column()
    category: string;

  @Column()
    brand: string;

  @Column()
    model: string;

  @Column()
    year: number;

  @Column()
    color: string;

  @Column()
    purchasePrice: number;

  @Column()
    status: string;

  @ManyToOne(() => EmployeeEntity, { eager: true })
  @JoinColumn({ name: "idEmployee" })
    employee: EmployeeEntity;

  @Column()
    idEmployee: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.status = "disponível";
    }
  }
}
