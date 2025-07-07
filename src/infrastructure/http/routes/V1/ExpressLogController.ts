import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../../container/ServiceContainer";
import { Log } from "../../../../domain/models/Log";

export class ExpressLogController {

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { version, franchise, metadata } = req.body;

            const log: Log = await ServiceContainer.log.create.execute(franchise, version, metadata);
            res.status(201).json(log);
        } catch (error) {
            next(error);
        }
    }

    async FindAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const logs = await ServiceContainer.log.getAll.execute();
            res.status(200).json(logs);
        } catch (error) {
            next(error);
        }
    }

    async FindById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const log = await ServiceContainer.log.getById.execute(id);
            if (log) {
                res.status(200).json(log);
            } else {
                res.status(404).json({ error: "Log not found" });
            }
        } catch (error) {
            next(error);
        }
    }
}