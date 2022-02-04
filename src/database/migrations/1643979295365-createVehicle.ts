import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createVehicle1643979295365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "vehicles",
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
            name: "category",
            type: "varchar",
          },
          {
            name: "brand",
            type: "varchar",
          },
          {
            name: "model",
            type: "varchar",
          },
          {
            name: "year",
            type: "numeric",
          },
          {
            name: "color",
            type: "varchar",
          },
          {
            name: "purchasePrice",
            type: "numeric",
          },
          {
            name: "status",
            type: "varchar",
          },
          {
            name: "idEmployee",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "idEmployeeVehicle",
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
    await queryRunner.dropTable("vehicles");
  }
}
