import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class updateColumnsIsUniqueEmployee1643766341764 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("employees", [
      {
        oldColumn: new TableColumn({
          name: "cpf",
          type: "numeric",
        }),
        newColumn: new TableColumn({
          name: "cpf",
          type: "numeric",
          isUnique: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "email",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "email",
          type: "varchar",
          isUnique: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "avatarUrl",
          type: "varchar",
        }),
        newColumn: new TableColumn({
          name: "avatarUrl",
          type: "varchar",
          isUnique: true,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns("employees", [
      {
        oldColumn: new TableColumn({
          name: "cpf",
          type: "numeric",
          isUnique: true,
        }),
        newColumn: new TableColumn({
          name: "cpf",
          type: "numeric",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "email",
          type: "varchar",
          isUnique: true,
        }),
        newColumn: new TableColumn({
          name: "email",
          type: "varchar",
        }),
      },
      {
        oldColumn: new TableColumn({
          name: "avatarUrl",
          type: "varchar",
          isUnique: true,
        }),
        newColumn: new TableColumn({
          name: "avatarUrl",
          type: "varchar",
        }),
      },
    ]);
  }
}
