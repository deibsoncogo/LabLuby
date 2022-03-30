import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (request, response) => response.status(200).json("Hello word"));

export { indexRouter };
