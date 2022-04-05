# Prova sobre o Adonis V5 - Trilha dev backend - LabLub
Resolução da prova sobre o Adonis V5 proposto da trilha dev backend da LabLuby.
Que é a construção de uma API com o Adonis V5 e Docker para armazenar apostas e jogos de sorte.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Prova%20Adonis%20V5%20LabLuby&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdeibsoncogo%2FProvaAdonisV5LabLuby%2Fmaster%2Fdocs%2Finsomnia.json%3Ftoken%3DGHSAT0AAAAAABSIBN7GZFOQADLAWG2R4AHYYR2AT4Q)

## Banco de dados
Para lidar com o docker-compose temos os seguintes comandos:
```typescript
// para criar e executar os container em segundo plano
docker-compose up -d

// para executar os container
docker-compose start

// para interromper a execução dos container
docker-compose stop
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

### Teste
Para executar os teste você pode utilizar este atalho `yarn test` ou comando abaixo, vale notar que ele precisa ser rodado com as `migrations` não criada e no final ele vai desfazer elas.
```bash
node -r @adonisjs/assembler/build/register japaFile.ts
```

## Ferramentas e dependências utilizado
As ferramentas utilizadas foram: `Yarn`, `Node JS`, `TypeScript`, `Adonis V5`, `Docker`, `Insomnia` e `Beekeeper Studio`

As dependências utilizadas foram: `adonisjs`, `adonis-scheduler`, `luxon`, `node-cron`, `pg`, `phc-argon2`, `proxy-addr`, `reflect-metadata`, `source-map-support` e `uuid`.

Dependências usadas em modo de desenvolvimento: `@adonisjs/assembler`, `adonis-preset-ts`, `eslint`, `eslint-config-prettier`, `eslint-plugin-adonis`, `eslint-plugin-prettier`, `pino-pretty`, `prettier`, `typescript`, `youch` e `youch-terminal`.
