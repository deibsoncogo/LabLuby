import { Router } from "express";
import { PurchaseController } from "../controllers/purchaseController";
import { TransactionController } from "../controllers/transactionController";

const indexRouter = Router();
const purchaseController = new PurchaseController();

indexRouter.get("/", (request, response) => response.status(200).json("Hello word"));
indexRouter.post("/purchase", purchaseController.execute);
indexRouter.post("/transaction", new TransactionController().execute);

export { indexRouter };
