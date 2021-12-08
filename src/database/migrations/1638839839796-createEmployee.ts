import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createEmployee1638839839796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( // cria a tabela de funcionários
      new Table(
        {
          name: "employees", // define o name da tabela
          columns: [ // define as colunas da tabela
            {
              name: "id",
              type: "uuid",
              isPrimary: true,
            },
            {
              name: "name",
              type: "varchar",
            },
            {
              name: "cpf",
              type: "numeric",
            },
            {
              name: "email",
              type: "varchar",
            },
            {
              name: "password",
              type: "varchar",
            },
            {
              name: "avatarUrl",
              type: "varchar",
            },
            {
              name: "isAdmin",
              type: "boolean",
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
    await queryRunner.dropTable("employees"); // exclui toda tabela de funcionários
  }
}
