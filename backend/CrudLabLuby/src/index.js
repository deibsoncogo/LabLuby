const express = require("express");

const server = express();

server.use(express.json());

const cursos = ["FullStack Master", "Desenvolvimento de Games", "Viver de YouTube"];

// retorna um curso
server.get("/curso/:index", (request, response) => {
  const { index } = request.params;

  return response.json(cursos[index]);
});

// retorna todos os cursos
server.get("/curso", (request, response) => {
  return response.json(cursos);
});

// criar um novo curso
server.post("/curso", (request, response) => {
  const { name } = request.body;

  cursos.push(name);

  return response.json(cursos);
})

// atualizar um curso
server.put("/curso/:index", (request, response) => {
  const { index } = request.params;
  const { name } = request.body;

  cursos[index] = name;

  return response.json(cursos);
});

// deletar um curso
server.delete("/curso/:index", (request, response) => {
  const { index } = request.params;

  cursos.splice(index, 1);

  return response.json({message: "O curso foi deletado"});
});

server.listen(3000);
