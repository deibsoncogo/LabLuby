import { Connection, createConnection, getConnectionOptions } from "typeorm";

// função secundária, responsável por criar a conexão com o banco de dados
async function CreateConnection(host?: string): Promise<Connection> {
  const defaultOptions = await getConnectionOptions();
  return createConnection(Object.assign(defaultOptions, { host }));
}

// função principal, responsável por tornar o usuário mais antigo e ativo como administrador
async function CreateInternalUserAdmin() {
  const connection = await CreateConnection("localhost");

  const alreadyExistsEmployeeAdmin = await connection
    .getRepository("employees")
    .createQueryBuilder("employeesQueryBuilder")
    .addOrderBy("employeesQueryBuilder.createdAt", "ASC")
    .where("employeesQueryBuilder.off = :off", { off: false })
    .andWhere("employeesQueryBuilder.isAdmin = :isAdmin", { isAdmin: true })
    .getOne();

  connection.close;

  if (alreadyExistsEmployeeAdmin) {
    return `O funcionário ${alreadyExistsEmployeeAdmin["name"]} já é um administrador`;
  }

  const employee = await connection
    .getRepository("employees")
    .createQueryBuilder("employeesQueryBuilder")
    .addOrderBy("employeesQueryBuilder.createdAt", "ASC")
    .where("employeesQueryBuilder.off = :off", { off: false })
    .getOne();

  connection.close;

  await connection
    .createQueryBuilder()
    .update("employees")
    .set({ isAdmin: true })
    .where("id = :id", { id: employee["id"] })
    .execute();

  connection.close;

  return `${employee["name"]} tornou-se administrador`;
}

// executa a função principal
CreateInternalUserAdmin().then((result) => console.log(result));
