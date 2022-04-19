import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class clients1649940274000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clients",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isUnique: true,
          },
          {
            name: "user_id",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "full_name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "cpf",
            type: "numeric",
            isUnique: true,
          },
          {
            name: "phone",
            type: "numeric",
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "state",
            type: "varchar",
          },
          {
            name: "zip_code",
            type: "numeric",
          },
          {
            name: "average_salary",
            type: "numeric",
          },
          {
            name: "current_balance",
            type: "numeric",
          },
          {
            name: "status",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clients");
  }
}
