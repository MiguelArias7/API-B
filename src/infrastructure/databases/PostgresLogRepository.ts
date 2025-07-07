import { Pool } from "pg";
import { Log } from "../../domain/models/Log";
import { LogRepository } from "../../domain/ports/LogRepository";
import { parseValtoInt, parseValtoString } from "../../utils";
import { Metadata } from "../../domain/models/Metadata";
import { TABLE_NAMES } from "../../const";

// This class implements the LogRepository interface for PostgreSQL database operations.
export class PostgresLogRepository implements LogRepository {

    static #instance: PostgresLogRepository;
    private pool: Pool;
    private static readonly TABLE_NAME: TABLE_NAMES = TABLE_NAMES.LOGS;

    public static get instance(): PostgresLogRepository {
        if (!PostgresLogRepository.#instance) {
            PostgresLogRepository.#instance = new PostgresLogRepository();
        }
        return PostgresLogRepository.#instance;
    }

    private constructor() {

        this.pool = new Pool({
            user: parseValtoString(process.env.POSTGRES_USER),
            password: parseValtoString(process.env.POSTGRES_PASSWORD),
            database: parseValtoString(process.env.POSTGRES_DB),
            host: parseValtoString(process.env.POSTGRES_HOST),
            port: parseValtoInt(process.env.POSTGRES_PORT),
        })
    }


    async findById(id: string): Promise<Log | null> {

        const result = await this.pool.query<Log>(`SELECT * FROM ${PostgresLogRepository.TABLE_NAME} WHERE id = $1`, [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Log(
                row.id,
                row.franchise,
                row.version,                
                row.metadata,
                row.timestamp,
                row.status,
                row.error
            );
        }
        return null;

    }

    async findAll(): Promise<Log[]> {

        const result = await this.pool.query<Log>(`SELECT * FROM ${PostgresLogRepository.TABLE_NAME}`);
        return result.rows.map(row => new Log(
            row.id,
            parseValtoString(row.franchise),
            parseValtoString(row.version),
            Metadata.fromObject(row.metadata),
            new Date(row.timestamp),
            row.status,
            row.error
        ));

    }

    async create(log: Log): Promise<Log> {

        const result = await this.pool.query<Log>(
            `INSERT INTO ${PostgresLogRepository.TABLE_NAME} (id, franchise, version, timestamp, metadata, status, error) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                log.id,
                log.franchise,
                log.version,
                log.timestamp,
                log.metadata,
                log.status,
                log.error
            ]
        );
        const row = result.rows[0];
        return new Log(
            row.id,
            row.franchise,
            row.version,
            row.metadata,
            row.timestamp,
            row.status,
            row.error
        );

    }

    async update(log: Log): Promise<Log> {

        const result = await this.pool.query<Log>(
            `UPDATE ${PostgresLogRepository.TABLE_NAME} 
                 SET franchise = $1, version = $2, timestamp = $3, metadata = $4, status = $5, error = $6 
                 WHERE id = $7 RETURNING *`,
            [
                log.franchise,
                log.version,
                log.timestamp,
                log.metadata ? JSON.stringify(log.metadata) : null,
                log.status,
                log.error,
                log.id
            ]
        );
        const row = result.rows[0];
        return new Log(
            row.id,
            row.franchise,
            row.version,
            row.metadata,
            row.timestamp,
            row.status,
            row.error
        );

    }

    async delete(id: string): Promise<void> {
        await this.pool.query<Log>(`DELETE FROM ${PostgresLogRepository.TABLE_NAME} WHERE id = $1`, [id]);
    }

    async exists(id: string): Promise<boolean> {
        const result = await this.pool.query<Log>(`SELECT 1 FROM ${PostgresLogRepository.TABLE_NAME} WHERE id = $1`, [id]);
        return result.rows.length > 0;
    }
}