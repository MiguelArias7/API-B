import { Log } from "../../domain/models/Log";
import { LogRepository } from "../../domain/ports/LogRepository";

export class LogFindAll {

    constructor(private logRepository: LogRepository) { }

    async execute(): Promise<Log[]> {
        // Fetch all logs using the repository
        return this.logRepository.findAll();
    }
}