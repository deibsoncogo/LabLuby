# Teste lógico | Programa Lab Luby JavaScript
Este teste lógico consiste na resolução de 10 métodos

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Teste%20l%C3%B3gico%20do%20Programa%20Lab%20Luby%20JavaScript&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdeibsoncogo%2FLabLuby%2Fmaster%2Fbackend%2FTesteLogicoLabLuby%2Fdocs%2FInsomnia_2022-10-15.json)

## Ambiente de trabalho
Para instalar as dependências necessárias temos que executar o seguinte comando
```bash
yarn
```

Para iniciar o servidor podemos utilizar o atalho `yarn dev` ou o seguinte comando
```bash
yarn ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --respawn --ignore-watch node_modules src/index.ts
```

O servidor vai rodar na porta 3333

## Ferramentas e dependências utilizado
  * As ferramentas utilizadas foram: `Yarn`, `Node JS`, `TypeScript`
  * As dependências utilizadas foram: `express`
  * Dependências usadas em modo de desenvolvimento: `eslint`, `ts-node-dev` e `typescript`

### Método 1
Implemente um método que crie um novo array baseado nos valores passados
  * Entradas: (3, a)
  * Resultado: ["a", "a", "a"]

**POST** /method1
```ts
{ // schema body
  "repeat": 3,
  "value": "a"
}

// resposta
status(201).json(["a", "a", "a"])
```

### Método 2
Implemente um método que inverta um array, não utilize métodos nativos do array
  * Entrada: [1, 2, 3, 4]
  * Resultado: [4, 3, 2, 1]

**POST** /method2
```ts
{ // schema body
  "arrayOld": [1, 2, 3, 4]
}

// resposta
status(201).json([4, 3, 2, 1])
```

### Método 3
Implemente um método que limpe os itens desnecessários de um array (false, undefined, strings vazias, zero, null)
  * Entrada: [1, 2, "", null]
  * Resultado: [1, 2]

**POST** /method3
```ts
{ // schema body
  "array": [1, 2, "", null]
}

// resposta
status(201).json([1, 2])
```

### Método 4
Implemente um método que a partir de um array de arrays, converta em um objeto com chave e valor
  * Entrada: [["c", 2], ["d", 4]]
  * Resultado: { "c": 2, "d": 4 }

**POST** /method4
```ts
{ // schema body
  "array": [["c", 2], ["d", 4]]
}

// resposta
status(201).json({ "c": 2, "d": 4 })
```

### Método 5
Implemente um método que retorne um array, sem os itens passados por parâmetro depois do array de entrada
  * Entrada: ([5, 4, 3, 2, 5], [5, 3])
  * Resultado: [4, 2]

**POST** /method5
```ts
{ // schema body
  "array": [5, 4, 3, 2, 5],
  "arrayRemove": [5, 3]
}

// resposta
status(201).json([4, 2])
```

### Método 6
Implemente um método que retorne um array, sem valores duplicados
  * Entrada: [1, 2, 3, 3, 2, 4, 5, 4, 7, 3]
  * Resultado: [1, 2, 3, 4, 5, 7]

**POST** /method6
```ts
{ // schema body
  "array": [1, 2, 3, 3, 2, 4, 5, 4, 7, 1, 3]
}

// resposta
status(201).json([1, 2, 3, 4, 5, 7])
```

### Método 7
Implemente um método que compare a igualdade de dois arrays e retorne um valor booleano
  * Entrada: ([1, 2, 3, 4], [1, 2, 3, 4])
  * Resultado: true

**POST** /method7
```ts
{ // schema body
  "arrayA": [1, 2, 3, 4],
  "arrayTwo": [1, 2, 3, 4]
}

// resposta
status(201).json(true)
```

### Método 8
Implemente um método que remova os aninhamentos de um array de arrays para um array único
  * Entrada: [1, 2, [3], [4, 5]]
  * Resultado: [1, 2, 3, 4, 5]

**POST** /method8
```ts
{ // schema body
  "array": [1, 2, [3], [4, 5]]
}

// resposta
status(201).json([1, 2, 3, 4, 5])
```

### Método 9
Implemente um método divida um array por uma quantidade passada por parâmetro
  * Entrada: ([1, 2, 3, 4, 5], 2)
  * Resultado: [[1, 2], [3, 4], [5]]

**POST** /method9
```ts
{ // schema body
  "array": [1, 2, 3, 4, 5],
  "division": 2
}

// resposta
status(201).json([[1, 2], [3, 4], [5]])
```

### Método 10
Implemente um método que encontre os valores comuns entre dois arrays
  * Entrada: ([6, 8], [8, 9])
  * Resultado: [8]

**POST** /method10
```ts
{ // schema body
  "arrayA": [6, 8],
  "arrayTwo": [8, 9]
}

// resposta
status(201).json([8])
```
