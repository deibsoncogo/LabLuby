# Programa LabLuby JS - Remoto
Este teste técnico consiste na criação de um `backend` com `Node JS` e o `TypeScript` para gerenciar uma empresa de venda de veículos

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=LabLuby%20Teste%20T%C3%A9cnico&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdeibsoncogo%2FLabLubyTesteTecnico-%2Fmaster%2Fsrc%2Fassets%2FInsomniaLabLubyTesteTecnico%3Ftoken%3DAO7NLS5PJ4IBBYGJO6Y4Z5DBWQGP2)

## Ambiente de trabalho
Para instalar as dependências necessárias temos que executar o seguinte comando
```bash
yarn
```

Para iniciar o servidor podemos utilizar o atalho `yarn dev` ou o seguinte comando
```bash
yarn ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --respawn --ignore-watch node_modules src/server.ts,
```

O servidor vai rodar na porta 3333

## Ferramentas e dependências utilizado
As ferramentas utilizadas foram: `Yarn`, `Node JS`, `TypeScript`

As dependências utilizadas foram: `bcryptjs`, `express`, `express-async-errors`, `jsonwebtoken`, `pg`, `reflect-metadata`, `tsconfig-paths`, `tsyringe`, `typeorm` e `uuid`

Dependências usadas em modo de desenvolvimento: `eslint`, `ts-node-dev` e `typescript`
