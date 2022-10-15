# Requisitos não funcionais
[X] Construir toda aplicação utilizando Nest JS e GraphQL [RNF01]
[X] Construir banco de dados com base no JSON [RNF02]
[X] Construir uma validação da entrada de dados [RNF03]
[X] Construir o banco de dados com o Prisma []

# Requisitos funcionais
* rule player:
  * all method: create, find, update
  * except router: app

* rule admin:
  * all method: find all, delete
  * router: rules, userRule

[X] CRUD de users [RF02]

[X] CREATE de auths [RF01]

[] DELETE de auths []

[] UPDATE de password por email []

[X] CRUD de rules [RF05]
  [X] Determinar rotas privadas
  * rule: player e admin

[X] CRD de users rules [RF00]

[X] CRUD de games [RF03]

[X] CRUD de carts [RF00]

[X] CRUD de bets [RF04]
  * As apostas deve passar por um carrinho respeitando o valor mínimo

[X] CREATE seeder [RF00]
  * user: devterceiro
  * rules: player, admin
  * games: conforme documentação
  * userRule: todas regras para o devterceiro

[] CREATE tests []

# Anotações
[X] Pode ser utilizado o mesmo diagrama feito na prova de Adonis V5
[X] Deve-se construir uma collection no Insomnia para ser compartilhado

# Geral
[X] Verificar o porque o updated_at não está atualizando
[X] Testar as validações de dados e como vou validar os arquivos sem dto
[X] Ao criar um usuário adicionar a regra player
[X] Alterar ordem da listagem geral de games e rules
[X] Criar a criptografia das senhas e remover seu retorno
[X] Modificar user rules para cascade
[X] Verificar o problema com o retorno nas requisições
[X] Verificar se as relações estão sendo retornadas
[X] Remover os controllers

# Correções
