import { Log } from "../../domain/models/Log";
import { LogRepository } from "../../domain/ports/LogRepository";

export class LogFindById {

    constructor(private logRepository: LogRepository) { }

    async execute(id: string): Promise<Log | null> {
        // Fetch all logs using the repository
        return this.logRepository.findById(id);
    }
}