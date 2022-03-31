import { Router } from "express";
import { PurchaseController } from "../controllers/purchaseController";

const indexRouter = Router();
const purchaseController = new PurchaseController();

indexRouter.get("/", (request, response) => response.status(200).json("Hello word"));
indexRouter.post("/purchase", purchaseController.execute);

export { indexRouter };
