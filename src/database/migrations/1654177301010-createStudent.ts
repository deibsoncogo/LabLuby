import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createStudent1654177301010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "students",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "phone",
            type: "float",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "mother_name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "cpf",
            type: "float",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            isUnique: true,
            isNullable: false,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("students")
  }
}
