import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createVehicle1639091164604 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: "vehicles",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true,
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
              name: "km",
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
              name: "createdAt",
              type: "timestamp",
              default: "now()",
            },
            {
              name: "updatedAt",
              type: "timestamp",
              default: "now()",
            },
          ],
        },
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("vehicles");
  }
}
