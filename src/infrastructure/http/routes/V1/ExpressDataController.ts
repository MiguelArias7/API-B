import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../../container/ServiceContainer";
import { Metadata } from "../../../../domain/models/Metadata";
import { Configuration } from "../../../../domain/models/Configuration";
import { Pokemon } from "../../../../domain/models/Pokemon";
import { Digimon } from "../../../../domain/models/Digimon";
import { FranchiseCreature } from "../../../../domain/models/FranchiseCreature";
import { FRANCHISE } from "../../../../const";

export class ExpressDataController {

    async FindById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { metadata: metadataJson, config: configJson } = req.query;
            const { franchise } = req.params;
            const metadata = typeof metadataJson === "string" ? JSON.parse(metadataJson) : metadataJson;
            const config = typeof configJson === "string" ? JSON.parse(configJson) : configJson;

            if (franchise.toLocaleLowerCase() === FRANCHISE.POKEMON.toLocaleLowerCase()) {
                const pokemon: Pokemon = await ServiceContainer.data.getPokemonByPokemon.execute(
                    Metadata.fromObject(metadata),
                    Configuration.fromObject(config)
                );
                const franchiseCreature: FranchiseCreature = FranchiseCreature.FromPokemon(pokemon);
                res.status(200).json(franchiseCreature);
            }
            else if (franchise.toLocaleLowerCase() === FRANCHISE.DIGIMON.toLocaleLowerCase()) {
                const digimon: Digimon = await ServiceContainer.data.getDigimonById.execute(
                    Metadata.fromObject(metadata),
                    Configuration.fromObject(config)
                );

                const franchiseCreature: FranchiseCreature = FranchiseCreature.FromDigimon(digimon);
                res.status(200).json(franchiseCreature);
            }
            else {
                res.status(400).json({ error: "Invalid franchise" });
            }

        } catch (error) {
            console.error("Error fetching log by ID:", error);
            next(error);
        }
    }
}