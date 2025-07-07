import { STATUS } from "../../const";
import { Log } from "../../domain/models/Log";
import { Metadata } from "../../domain/models/Metadata";
import { LogRepository } from "../../domain/ports/LogRepository";

export class LogCreate {

    constructor(private logRepository: LogRepository) { }

    async execute(franchise: string, version: string, metadata: { name: string, id: string }, error?: string): Promise<void> {

        const log = new Log(this.generateId(),
            franchise,
            version,
            Metadata.fromObject(metadata),
            new Date(),
            STATUS.SUCCESS,
            error
        )

        // Save the log using the repository
        await this.logRepository.create(log);
    }

    // FIXME - This is a temporary ID generator, replace with a proper UUID generator in production
    private generateId() {
        return Math.random().toString(36).substring(2, 15);
    }
}