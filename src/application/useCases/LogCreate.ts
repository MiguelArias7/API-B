import { STATUS } from "../../const";
import { Log } from "../../domain/models/Log";
import { LogMetadata } from "../../domain/models/LogMetadata";
import { LogRepository } from "../../domain/ports/LogRepository";

export class LogCreate {

    constructor(private logRepository: LogRepository) { }

    async execute(franchise: string, version: string, metadata: { name: string, id: string }): Promise<void> {

        const log = new Log(this.generateId(),
            franchise,
            version,
            new LogMetadata(metadata.id, metadata.name),
            new Date(),
            STATUS.SUCCESS,
            '',
        )

        // Save the log using the repository
        await this.logRepository.create(log);
    }

    // FIXME - This is a temporary ID generator, replace with a proper UUID generator in production
    private generateId() {
        return Math.random().toString(36).substring(2, 15);
    }
}