import { Log } from "../models/Log";
import { BaseRepository } from "./BaseRepository";

export interface LogRepository extends BaseRepository<Log> {
    findById(id: string): Promise<Log | null>;
    findAll(): Promise<Log[]>;
    create(log: Log): Promise<Log>;
    update(log: Log): Promise<Log>;
    delete(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;
}