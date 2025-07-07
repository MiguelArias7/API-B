import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../container/ServiceContainer";

// This middleware logs requests and errors that occur during request processing.
export async function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const { metadata: metadataJson } = req.query;
    const { franchise } = req.params;
    const metadata = typeof metadataJson === "string" ? JSON.parse(metadataJson) : metadataJson;

    try {
        await ServiceContainer.log.create.execute(franchise, "v1", metadata);
    } catch (error) {
        // Log the error with relevant details
        const { franchise } = req.params;
        const errorMessage = error instanceof Error ? error.message : String(error);
        await ServiceContainer.log.create.execute(franchise, "v1", metadata, errorMessage);
    }
    next();
}
