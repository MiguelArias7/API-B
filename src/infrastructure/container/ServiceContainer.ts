import { DigimonPort } from "../../adapters/external/DigimonAdapter";
import { PokemonPort } from "../../adapters/external/PokemonAdapter";
import { DataFindById } from "../../application/useCases/DataFindById";
import { LogCreate } from "../../application/useCases/LogCreate";
import { LogFindAll } from "../../application/useCases/LogFindAll";
import { LogFindById } from "../../application/useCases/LogFindById";
import { Digimon } from "../../domain/models/Digimon";
import { Pokemon } from "../../domain/models/Pokemon";
import { PostgresLogRepository } from "../databases/PostgresLogRepository";


// const logRepository = new InMemoryLogRepository();
const logRepository = PostgresLogRepository.instance;

const PokemonFranchisePort: PokemonPort = new PokemonPort();
const DigimonFranchisePort: DigimonPort = new DigimonPort();

// ServiceContainer is a singleton that holds instances of use cases for logging and data retrieval.
export const ServiceContainer = {
    log: {
        create: new LogCreate(logRepository),
        getAll: new LogFindAll(logRepository),
        getById: new LogFindById(logRepository),
    },
    data: {
        getDigimonById: new DataFindById<Digimon>(DigimonFranchisePort),
        getPokemonByPokemon: new DataFindById<Pokemon>(PokemonFranchisePort),
    },
}