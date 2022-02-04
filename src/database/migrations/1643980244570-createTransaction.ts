import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTransaction1643980244570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",

        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isUnique: true,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "date",
            type: "timestamp",
          },
          {
            name: "amount",
            type: "numeric",
          },
          {
            name: "idVehicle",
            type: "uuid",
            isUnique: true,
          },
          {
            name: "idEmployee",
            type: "uuid",
          },
        ],

        foreignKeys: [
          {
            name: "idVehicleTransaction",
            referencedTableName: "vehicles",
            referencedColumnNames: ["id"],
            columnNames: ["idVehicle"],
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
          },
          {
            name: "idEmployeeTransaction",
            referencedTableName: "employees",
            referencedColumnNames: ["id"],
            columnNames: ["idEmployee"],
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
  }
}
