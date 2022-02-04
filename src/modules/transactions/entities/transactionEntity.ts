import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v1 as uuid } from "uuid";
import { EmployeeEntity } from "../../employees/entities/employeeEntity";
import { VehicleEntity } from "../../vehicles/entities/vehicleEntity";

@Entity("transactions")
export class TransactionEntity {
  @PrimaryColumn()
    id: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @Column()
    type: string;

  @Column()
    date: Date;

  @Column()
    amount: number;

  @ManyToOne(() => VehicleEntity, { eager: true })
  @JoinColumn({ name: "idVehicle" })
    vehicle: VehicleEntity;

  @Column()
    idVehicle: string;

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
    }
  }
}
