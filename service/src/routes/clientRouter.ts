import { Router } from "express";
import { CreateOneClientController } from "../modules/clients/useCases/createOneClient/createOneClientController";
import { FindAllFilterClientController } from "../modules/clients/useCases/findAllFilterClient/findAllFilterClientController";

const clientRouter = Router();

clientRouter.get("/findAllFilterClient", new FindAllFilterClientController().handle);
clientRouter.post("/createOneClient", new CreateOneClientController().handle);

export { clientRouter };
