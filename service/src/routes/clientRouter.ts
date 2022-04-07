import { Router } from "express";

const clientRouter = Router();

clientRouter.get("/", (request, response) => response.status(200).json(
  { message: "Hello world do client" },
));

export { clientRouter };
