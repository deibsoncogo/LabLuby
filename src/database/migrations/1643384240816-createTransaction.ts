import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTransaction1643384240816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
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
            name: "idEmployee",
            type: "uuid",
          },
          {
            name: "idVehicle",
            type: "uuid",
            isUnique: true,
          },
          {
            name: "date",
            type: "timestamp",
          },
          {
            name: "amount",
            type: "numeric",
          },
        ],
        foreignKeys: [
          {
            name: "idEmployeeTransactionFK",
            referencedTableName: "employees",
            referencedColumnNames: ["id"],
            columnNames: ["idEmployee"],
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
          },
          {
            name: "idVehicleTransactionFK",
            referencedTableName: "vehicles",
            referencedColumnNames: ["id"],
            columnNames: ["idVehicle"],
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
