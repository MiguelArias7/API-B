import { Router } from "express";
import { ExpressDataController } from "./ExpressDataController";
import { loggerMiddleware } from "../../middleware/LoggerMiddleware";
import { errorLoggerMiddleware } from "../../middleware/ErrorLoggerMiddleware";

const DataController = new ExpressDataController();

const ExpressDataRouter = Router();

ExpressDataRouter.get("/:franchise/v1", loggerMiddleware, DataController.FindById);
ExpressDataRouter.use("/:franchise/v1", errorLoggerMiddleware);

export { ExpressDataRouter };