import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createTableClients1649267206949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'numeric',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'id_secure',
            type: 'uuid',
            isUnique: true,
          },
          {
            name: 'full_name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'numeric',
            isUnique: true,
          },
          {
            name: 'cpf_numeric',
            type: 'numeric',
            isUnique: true,
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'zip_code',
            type: 'numeric',
          },
          {
            name: 'current_balance',
            type: 'numeric',
          },
          {
            name: 'average_salary',
            type: 'numeric',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients')
  }
}
