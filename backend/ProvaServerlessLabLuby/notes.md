# Requisitos não funcionais
[X] Criar um microsservice com Serverless Framework e TypeScript com o Amazon AWS [RNF01]
[X] Usar um destes serviço MySQL como banco de dados [RNF02]
  * SGBD MySQL utilizando o serviço da AWS RDS
  * Plugin Serverless Offline para conexão com banco de dados local
[X] O CRUD de usuários ficará separado do microsservice de autenticação [RNF03]

# Requisitos funcionais
[X] CREATE Login user [RF01]
  * token JWT

[X] CREATE rota autenticada [RF02]
  * exibir a mensagem `Bem-vindo ao serverless ${name}`

[X] CRUD user [RF03]
  * access level: CREATE public

## Table users
id, name, cpf, email, password, created_at, updated_at

# Observação
Criar um Microsservice utilizando Serverless Framework para autenticação de um user e um CRUD de user
Remover os serviços da AWS após apresentação ao tutor

# Anotações
yarn build
yarn serverless offline
yarn serverless deploy --stage prod
yarn serverless remove --stage prod

# Correções
[?] 404 para usuário não encontrado
