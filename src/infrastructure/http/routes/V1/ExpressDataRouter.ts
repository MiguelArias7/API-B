import { Router } from "express";
import { ExpressDataController } from "./ExpressDataController";
import { loggerMiddleware } from "../../middleware/LoggerMiddleware";
import { errorLoggerMiddleware } from "../../middleware/ErrorLoggerMiddleware";

const DataController = new ExpressDataController();

// This router handles data requests for different franchises (e.g., Pokemon, Digimon).
const ExpressDataRouter = Router();

// Route to fetch data by franchise and version
ExpressDataRouter.get("/:franchise/v1", loggerMiddleware, DataController.FindById);
ExpressDataRouter.use("/:franchise/v1", errorLoggerMiddleware);

export { ExpressDataRouter };