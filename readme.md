# Prova sobre o Adonis V5 - Trilha dev backend - LabLub
Resolução da prova sobre o Adonis V5 proposto da trilha dev backend da LabLuby.
Que é a construção de uma API com o Adonis V5 e Docker para armazenar apostas e jogos de sorte.

## Banco de dados
Para criar o container utilizando o `Docker` basta executar este comando:
```bash
docker run --name ProvaAdonisV5LabLuby -e POSTGRES_DB=ProvaAdonisV5LabLubyDB -e POSTGRES_USER=ProvaAdonisV5LabLuby -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Depois execute este atalho `yarn db:run` para criar as tabelas ou o seguinte comando:
```bash
node ace migration:run
```

## Ambiente de trabalho
Para instalar as dependências necessárias temos que executar o seguinte comando
```bash
yarn
```

Para iniciar o servidor podemos utilizar o atalho `yarn dev` ou o seguinte comando
```bash
yarn node ace serve --watch
```

## Ferramentas e dependências utilizado
As ferramentas utilizadas foram: `Yarn`, `Node JS`, `TypeScript`, `Adonis V5`, `Docker`, `Insomnia` e `Beekeeper Studio`

As dependências utilizadas foram: `adonisjs`, `adonis-scheduler`, `luxon`, `node-cron`, `pg`, `phc-argon2`, `proxy-addr`, `reflect-metadata`, `source-map-support` e `uuid`.

Dependências usadas em modo de desenvolvimento: `@adonisjs/assembler`, `adonis-preset-ts`, `eslint`, `eslint-config-prettier`, `eslint-plugin-adonis`, `eslint-plugin-prettier`, `pino-pretty`, `prettier`, `typescript`, `youch` e `youch-terminal`.
