import "reflect-metadata";
import "./database";
import "./containers";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { AppError } from "./errors/appError";
import { indexRouter } from "./routes";

const app = express();

app.use(express.json());

app.use(indexRouter);

app.get("/", (request, response) => response.json({ message: "Hello word!" }));

// middleware de tipo erro para lidar com eles
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) { // se o erro foi criado pelo arquivo AppError envia estas informações
    return response.status(err.statusCode).json({ message: err.message }); // retornar algo ao chamador
  }

  // se for um erro inesperado usamos esta formatação para dar a tratativa
  return response.status(500).json({ message: `Erro interno do servidor - ${err.message}` }); // retornar algo ao chamador

  next(); // encerra o middleware voltando para o chamador
});

app.listen(3333, () => console.log("Server running on port 3333"));
