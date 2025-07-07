import { Configuration } from "../../domain/models/Configuration";
import { Metadata } from "../../domain/models/Metadata";
import { Pokemon } from "../../domain/models/Pokemon";
import { FranchisePort } from "./FranchisePort";

export class PokemonPort implements FranchisePort<Pokemon> {

    async getData(metadata: Metadata, configuration: Configuration): Promise<Pokemon> {
        const response = await fetch(`${configuration.baseUrl}/pokemon/${metadata.name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "API-Key": configuration.APIKey,
                ...configuration.headers
            }
        })

        const json: Pokemon = await response.json();
        return json as Pokemon;
    }
}