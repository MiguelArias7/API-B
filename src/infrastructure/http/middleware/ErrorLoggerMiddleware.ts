import { Request, Response, NextFunction } from "express";
import { ServiceContainer } from "../../container/ServiceContainer";

export async function errorLoggerMiddleware(err: Error, req: Request, res: Response, next: NextFunction): Promise<void> {
    const errorMessage = err instanceof Error ? err.message : String(err);
    const { metadata: metadataJson } = req.query;
    const { franchise } = req.params;
    const metadata = typeof metadataJson === "string" ? JSON.parse(metadataJson) : metadataJson;

    await ServiceContainer.log.create.execute(franchise, "v1", metadata, errorMessage);

    next(err); // Pass the error to the next middleware
}
