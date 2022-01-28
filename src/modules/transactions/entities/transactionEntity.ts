import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { EmployeeEntity } from "modules/employees/entities/employeeEntity";
import { VehicleEntity } from "modules/vehicles/entities/vehicleEntity";
import { v4 as uuidV4 } from "uuid";

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

  @ManyToOne(() => EmployeeEntity, { eager: true })
  @JoinColumn({ name: "idEmployee" })
    employee: EmployeeEntity;

  @Column()
    idEmployee: string;

  @ManyToOne(() => VehicleEntity, { eager: true })
  @JoinColumn({ name: "idVehicle" })
    vehicle: VehicleEntity;

  @Column()
    idVehicle: string;

  @Column()
    date: Date;

  @Column()
    amount: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}
