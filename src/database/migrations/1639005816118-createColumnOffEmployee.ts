import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class createColumnOffEmployee1639005816118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("employees", new TableColumn({
      name: "off",
      type: "boolean",
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("employees", "off");
  }
}
