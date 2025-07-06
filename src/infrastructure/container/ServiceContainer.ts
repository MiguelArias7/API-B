import { LogCreate } from "../../application/useCases/LogCreate";
import { LogFindAll } from "../../application/useCases/LogFindAll";
import { LogFindById } from "../../application/useCases/LogFindById";
import { InMemoryLogRepository } from "../databases/InMemoryLogRepository";
import { PostgresLogRepository } from "../databases/PostgresLogRepository";


// const logRepository = new InMemoryLogRepository();
const logRepository = PostgresLogRepository.instance;

export const ServiceContainer = {
    log: {
        create: new LogCreate(logRepository),
        getAll: new LogFindAll(logRepository),
        getById: new LogFindById(logRepository),
    }
}