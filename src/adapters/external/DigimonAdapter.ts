import { Configuration } from "../../domain/models/Configuration";
import { Digimon } from "../../domain/models/Digimon";
import { Metadata } from "../../domain/models/Metadata";
import { FranchisePort } from "./FranchisePort";

export class DigimonPort implements FranchisePort<Digimon> {

    async getData(metadata: Metadata, configuration: Configuration): Promise<Digimon> {
        const response = await fetch(`${configuration.baseUrl}/digimon/${metadata.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "API-Key": configuration.APIKey,
                ...configuration.headers
            }
        })

        const json: Digimon = await response.json();
        return json as Digimon;
    }
}