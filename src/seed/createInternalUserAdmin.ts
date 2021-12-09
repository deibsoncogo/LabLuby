import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

async function CreateConnection(host?: string): Promise<Connection> {
  const defaultOptions = await getConnectionOptions();
  return createConnection(Object.assign(defaultOptions, { host }));
}

async function CreateInternalUserAdmin() {
  const connection = await CreateConnection("localhost");

  const id = uuidV4();
  const password = await hash("labluby", 8);

  await connection.query(
    `INSERT INTO EMPLOYEES(
      id, name, cpf, email, password, "avatarUrl", "isAdmin", "createdAt", "updatedAt", "off")
      values('${id}', 'admin', 123, 'admin', '${password}', 'admin', true, 'now()', 'now()', false)`,
  );

  connection.close;
}

CreateInternalUserAdmin().then(() => console.log("Funcionário interno administrador criado"));
