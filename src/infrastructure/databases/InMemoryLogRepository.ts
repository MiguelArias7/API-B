import { Log } from "../../domain/models/Log";
import { LogRepository } from "../../domain/ports/LogRepository";

export class InMemoryLogRepository implements LogRepository {

    private logs: Array<Log> = new Array<Log>();

    async findById(id: string): Promise<Log | null> {
        return this.logs.find((log) => log.id === id) || null;
    }

    async findAll(): Promise<Log[]> {
        return this.logs;
    }

    async create(log: Log): Promise<Log> {
        this.logs.push(log);
        return log;
    }

    async update(log: Log): Promise<Log> {
        const index = this.logs.findIndex((l) => l.id === log.id);
        if (index === -1) {
            throw new Error(`Log with id ${log.id} does not exist`);
        }
        this.logs[index] = log;
        return log;
    }

    async delete(id: string): Promise<void> {
        const index = this.logs.findIndex((log) => log.id === id);
        if (index === -1) {
            throw new Error(`Log with id ${id} does not exist`);
        }
        this.logs.splice(index, 1);
    }

    async exists(id: string): Promise<boolean> {
        return this.logs.some((log) => log.id === id);
    }
}