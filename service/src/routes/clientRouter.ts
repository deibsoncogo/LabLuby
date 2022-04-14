import { Router } from "express";
import { CreateOneClientController } from "../modules/clients/useCases/createOneClient/createOneClientController";
import { DeleteOneIdClientController } from "../modules/clients/useCases/deleteOneIdClient/deleteOneIdClientController";
import { FindAllFilterClientController } from "../modules/clients/useCases/findAllFilterClient/findAllFilterClientController";
import { FindOneIdClientController } from "../modules/clients/useCases/findOneIdClient/findOneIdClientController";
import { UpdateOneClientController } from "../modules/clients/useCases/updateOneClient/updateOneClientController";
import { ValidateStatusAllClientController } from "../modules/clients/useCases/validateStatusAllClient/validateStatusAllClientController";

const clientRouter = Router();

clientRouter.patch("/validateStatusAllClient", new ValidateStatusAllClientController().handle);
clientRouter.get("/findAllFilterClient", new FindAllFilterClientController().handle);
clientRouter.delete("/:id", new DeleteOneIdClientController().handle);
clientRouter.put("/:id", new UpdateOneClientController().handle);
clientRouter.get("/:id", new FindOneIdClientController().handle);
clientRouter.post("/", new CreateOneClientController().handle);

export { clientRouter };
