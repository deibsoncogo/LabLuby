import { Router } from "express";
import { CreateOneClientController } from "../modules/clients/useCases/createOneClient/createOneClientController";
import { DeleteOneIdClientController } from "../modules/clients/useCases/deleteOneIdClient/deleteOneIdClientController";
import { FindFilterAllClientController } from "../modules/clients/useCases/findFilterAllClient/findFilterAllClientController";
import { FindOneCpfClientController } from "../modules/clients/useCases/findOneCpfClient/findOneCpfClientController";
import { FindOneIdClientController } from "../modules/clients/useCases/findOneIdClient/findOneIdClientController";
import { UpdateCurrentBalanceOneClientController } from "../modules/clients/useCases/updateCurrentBalanceOneClient/updateCurrentBalanceOneClientController";
import { UpdateOneClientController } from "../modules/clients/useCases/updateOneClient/updateOneClientController";
import { ValidateStatusAllClientController } from "../modules/clients/useCases/validateStatusAllClient/validateStatusAllClientController";

const clientRouter = Router();

clientRouter.get("/findOneCpf/:cpf", new FindOneCpfClientController().handle);
clientRouter.patch("/updateCurrentBalance", new UpdateCurrentBalanceOneClientController().handle);
clientRouter.patch("/validateStatusAllClient", new ValidateStatusAllClientController().handle);
clientRouter.get("/", new FindFilterAllClientController().handle);
clientRouter.delete("/:id", new DeleteOneIdClientController().handle);
clientRouter.put("/:id", new UpdateOneClientController().handle);
clientRouter.get("/:id", new FindOneIdClientController().handle);
clientRouter.post("/", new CreateOneClientController().handle);

export { clientRouter };
