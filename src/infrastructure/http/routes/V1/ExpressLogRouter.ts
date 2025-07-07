import { Router } from "express";
import { ExpressLogController } from "./ExpressLogController";


const LogController = new ExpressLogController();

const ExpressLogRouter = Router();
ExpressLogRouter.post("/log", LogController.create);
ExpressLogRouter.get("/log", LogController.FindAll);
ExpressLogRouter.get("/log/:id", LogController.FindById);

export { ExpressLogRouter };