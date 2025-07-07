import { Router } from "express";
import { ExpressDataController } from "./ExpressDataController";
import { loggerMiddleware } from "../../middleware/LoggerMiddleware";

const DataController = new ExpressDataController();

const ExpressDataRouter = Router();

ExpressDataRouter.get("/:franchise/v1", loggerMiddleware(), DataController.FindById);

export { ExpressDataRouter };