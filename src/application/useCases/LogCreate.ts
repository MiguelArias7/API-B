import { STATUS } from "../../const";
import { Log } from "../../domain/models/Log";
import { Metadata } from "../../domain/models/Metadata";
import { LogRepository } from "../../domain/ports/LogRepository";

export class LogCreate {

    constructor(private logRepository: LogRepository) { }

    async execute(franchise: string, version: string, metadata: { name: string, id: string }, error?: string): Promise<Log> {

        const status = error ? STATUS.FAIL : STATUS.SUCCESS;
        const log = new Log(
            this.generateId(),
            franchise,
            version,
            Metadata.fromObject(metadata),
            new Date(),
            status,
            error
        );

        // Save the log using the repository
        return this.logRepository.create(log);
    }

    private generateId() {
        return Math.random().toString(36).substring(2, 15);
    }
}