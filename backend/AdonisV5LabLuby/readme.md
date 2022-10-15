# Adonis V5 - Luby Software - Manoel Neto
Criação de uma aplicação com o [Adonis V5](https://docs.adonisjs.com/guides/introduction) junto do Manuel Neto

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Adonis%20V5%20LabLuby&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdeibsoncogo%2FAdonisV5LabLuby%2Fmaster%2FInsomnia-All_2022-03-10.json)

Para criar os arquivos iniciais da aplicação utilizamos o seguinte comando, depois informamos que será do tipo `api` o nome `adonisv5labluby` e definimos utilizar o `Eslint` e o `Prettier`.

```bash
yarn create adonis-ts-app adonisv5labluby
```

Para iniciar o servidor devemos utilizar este comando.

```bash
node ace serve --watch
```

Para utilizar o banco de dados devemos instalar o `Lucid` que é uma dependência do Adonis.

```bash
yarn add @adonisjs/lucid
```

Agora realizar as configurações devida conforme o tipo do banco de dados PostgreSQL e definir a visualização e execução dos comandos para `in the terminal`:

```bash
node ace configure @adonisjs/lucid
```

Para criar o contêiner do Docker devemos utilizar o seguinte comando

```bash
docker run --name AdonisV5LabLuby -e POSTGRES_DB=adonisv5lablubyDB -e POSTGRES_USER=adonisv5labluby -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Agora devemos ajustar as configurações do arquivo `.env` conforme o comando acima:

```
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=adonisv5labluby
PG_PASSWORD=docker
PG_DB_NAME=adonisv5lablubyDB
```

Para criar uma tabela utilizamos o seguinte comando para criar uma migration e depois os seguintes comandos:

```bash
node ace make:migration users
```

```tsx
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo('now()')
      table.timestamp('updated_at', { useTz: true }).defaultTo('now()')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

Ao editar uma migration e executar ela novamente o Adonis vai excluir ela assim perdendo os dados e depois criar novamente, para desativar isso em produção devemos realizar a seguinte configuração no arquivo `./config/database.ts`:

```tsx
import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION'),
  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST'),
        port: Env.get('PG_PORT'),
        user: Env.get('PG_USER'),
        password: Env.get('PG_PASSWORD', ''),
        database: Env.get('PG_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
        disableRollbacksInProduction: true, // adicionar esta linha
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
```

Para alterar uma tabela existente criamos uma nova migration vinculando a tabela desejada, a partir deste **[link](https://docs.adonisjs.com/reference/database/table-builder)** podemos ver todos comandos possíveis para realizar uma alteração:

```bash
node ace make:migration addColumnLastLoginAt --table=users
node ace make:migration renameColumnEmail --table=users
```

Para executar as migration utilizamos o comando `run` e o `reset` para desfazer as migrations

```bash
node ace migration:run
node ace migration:reset
```

um truque para ajustar o fuso horário é inserir este comando no arquivo `.env`:

```
TZ=America/Sao_Paulo
```

Para criar um modelo iremos utilizar esta comando

```bash
node ace make:model User
```

O Adonis possui o `snake_case` permitindo substituir o `_` dos nomes do colunas pela próxima letra em maiúscula, `snakeCase`

Os `seeder` servem para criar dados iniciais na aplicação, ele é muito utilizado para executar testes

```bash
node ace make:seeder User

```

```tsx
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await User.createMany([
      {
        eMail: 'primeiro@teste.com',
        password: '321',
      },
      {
        eMail: 'segundo@teste.com',
        password: '456',
      },
    ])
  }
}
```

Para executar o `seeder` temos estas opções

```tsx
node ace db:seed // executa todas
node ace db:seed './database/seeders/User.ts' // executa somente a informada
node ace db:seed -i // faz aparecer uma lista para escolher

```

Podemos adicionar o comandos abaixo no `seeder` bloqueado a execução dela na produção

```tsx
public static developmentOnly = true
```

Para configurar a execução do `seeder` para alterar os dados existente na tabela devemos ativar o `idempotent`

```tsx
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    const uniqueKey = 'eMail'

    await User.updateOrCreateMany(uniqueKey, [
      {
        eMail: 'primeiro@teste.com',
        password: '321',
      },
      {
        eMail: 'segundo@teste.com',
        password: '456',
      },
    ])
  }
}
```

Agora iremos ver como fazer o model criar um `uuid` utilizando o ciclo de vida, primeiro criamos a coluna na tabela e depois a instalação da dependência, por final o arquivo `model` vai ficar assim:

```bash
node ace make:migration addColumnSecureId --table=users
```

```bash
yarn add uuid
yarn add -D @types/uuid
```

```tsx
import { v4 as uuid } from 'uuid' // nova linha
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: number

  @column() // nova linha
  public secureId: uuid // nova linha

  @column()
  public eMail: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public lastLoginAt: DateTime

  @beforeCreate() // nova linha
  public static assignUuid(user: User) { // nova linha
    user.secureId = uuid() // nova linha
  } // nova linha
}
```

O `basic auth` é a forma mais fácil de criar uma autenticação pois ela precisa de um e-mail e uma senha mais falta segurança nela por poder ser interceptada.

As `sessions` utiliza `cookies` para deixar salvo no computador as autorizações que o usuário possui como nível de acesso uma desvantagem é que essa autenticação pode ser perdida com facilidade.

Os `tokens` é um código gerado a partir de uma palavra chave inalterável mais pode ser descriptografado por qualquer pessoa.

Para instalar o mecanismo de autenticação do Adonis utilizamos este comandos e depois o segundo para configurara ele falando que vamos utilizar o `lucid` do tipo `api` onde a autenticação será do modelo `User` salvo em `database` e também definimos para criar uma `migration`, depois temos que executar a migration:

```bash
yarn add @adonisjs/auth
node ace configure @adonisjs/auth
node ace migration:run
```

Agora iremos remover a coluna `last_login_at` e renomear a coluna `e_mail` com uma migration:

```bash
node ace make:migration removeColumnLastLoginAtAndRenameColumnEmail --table=users
```

Para criar a criptografia da senha iremos usar a dependência `argon`:

```
yarn add phc-argon2
```

Para dar uma limpada no arquivo de rota vamos criar um controller para cuidar da autenticação:

```
node ace make:controller auth
```

A rota `use` e defina pelo nome `any`.

Os parâmetros podem ser definido como não obrigatório adicionando o `?` no final:

```tsx
Route.any('/:name?', async ({ params }) => {
  if (params.name) {
    return { message: `Hello world, ${params.name}` }
  }

  return { message: 'Hello world' }
})
```

Podemos utilizar o símbolo coringa `*` no rota para pegar tudo que for informado depois dele:

```tsx
Route.get('/coringa/*', async ({ params }) => {
  return { coringa: params['*'] }
})
```

Tem como aplicar um regex na rota definindo oque podemos receber, ou também de forma global como no segundo exemplo:

```tsx
Route.any('/:name?', async ({ params }) => {
  if (params.name) {
    return { message: `Hello world, ${params.name}` }
  }

  return { message: 'Hello world' }
}).where('name', /^[a-z][A-Z]+$/)
```

```tsx
Route.where('id', match: /^\\d+$/)
```

Podemos utilizar o `cast` para converter o valor recebido na rota:

```tsx
Route.where('id', {
  match: /^\\d+$/,
  cast: (id) => Number(id),
})
```

Para configurar um `middleware` devemos alterar esta configuração no arquivo `../start/kernel.ts` informando um nome para ele e sua localização:

```tsx
Server.middleware.registerNamed({
  auth: () => import('../app/Middleware/Auth'),
})

```

Para criar um `controller` podemos utilizar este comando onde adicionando o `-r` no final faz ele criar a base de todos métodos e `-e` para ele não mudar o nome do `controller`:

```
node ace make:controller user -r
```

Conseguimos criar grupos de rotas para fazer uma configuração se aplicar a todas, definindo quais são privada ou adicionar um prefixo:

```tsx
Route.group(() => {
  Route.post('', 'UsersController.store')
  Route.post('/login', 'AuthController.login')
}).prefix('/user')

Route.group(() => {
  Route.get('/user', 'UsersController.index')
  Route.get('/user/:id', 'UsersController.show')
  Route.put('/user/:id', 'UsersController.update')
  Route.delete('/user/:id', 'UsersController.destroy')
}).middleware('auth')
```

Se respeitamos os nome dos métodos o `Adonis` vai entender automaticamente oque desejamos fazer com a requisição a partir do `verbo HTTP`, assim podemos criar a rota desta forma invés da anterior, utilizamos `only` para definir os métodos permitido e `except` o contrário, o comando `apiOnly` define que o `resource` vai poder acessar somente métodos de uma `api`:

```tsx
Route.group(() => {
  Route.resource('', 'UsersController').only(['store']).apiOnly()
  Route.post('/login', 'AuthController.login')
}).prefix('/user')

Route.group(() => {
  Route.resource('/user', 'UsersController').except(['store']).apiOnly()
}).middleware('auth')
```
