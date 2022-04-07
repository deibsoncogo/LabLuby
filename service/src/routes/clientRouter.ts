import { Router } from "express";
import { CreateOneClientController } from "../modules/clients/useCases/createOneClient/createOneClientController";

const clientRouter = Router();

clientRouter.post("/createOneClient", new CreateOneClientController().handle);

export { clientRouter };
