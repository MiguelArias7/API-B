import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../container/ServiceContainer";

export class ExpressLogController {

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { version, franchise, status, metadata } = req.body;
            const log = await ServiceContainer.log.create.execute(franchise, version, metadata);
            res.status(201).json(log);
        } catch (error) {
            console.error("Error creating log:", error);
            next(error);
        }
    }

    async FindAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const logs = await ServiceContainer.log.getAll.execute();
            res.status(200).json(logs);
        } catch (error) {
            console.error("Error fetching logs:", error);
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
            console.error("Error fetching log by ID:", error);
            next(error);
        }
    }
}