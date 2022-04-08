import { Router } from "express";
import { CreateOneClientController } from "../modules/clients/useCases/createOneClient/createOneClientController";
import { DeleteOneIdClientController } from "../modules/clients/useCases/deleteOneIdClient/deleteOneIdClientController";
import { FindAllFilterClientController } from "../modules/clients/useCases/findAllFilterClient/findAllFilterClientController";
import { UpdateOneClientController } from "../modules/clients/useCases/updateOneClient/updateOneClientController";
import { ValidateStatusAllClientController } from "../modules/clients/useCases/validateStatusAllClient/validateStatusAllClientController";

const clientRouter = Router();

clientRouter.patch("/validateStatusAllClient", new ValidateStatusAllClientController().handle);
clientRouter.delete("/deleteOneIdClient/:id", new DeleteOneIdClientController().handle);
clientRouter.put("/updateOneClient/:id", new UpdateOneClientController().handle);
clientRouter.get("/findAllFilterClient", new FindAllFilterClientController().handle);
clientRouter.post("/createOneClient", new CreateOneClientController().handle);

export { clientRouter };
