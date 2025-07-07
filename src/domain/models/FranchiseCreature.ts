import { Digimon } from "./Digimon";
import { Pokemon } from "./Pokemon";

export class FranchiseCreature {
    name: string;
    weight: number;
    powers: string[];
    evolutions: string[];

    constructor(name: string, weight: number, powers: string[], evolutions: string[]) {
        this.name = name;
        this.weight = weight;
        this.powers = powers;
        this.evolutions = evolutions;
    }

    static FromPokemon(pokemon: Pokemon): FranchiseCreature {

        if (!pokemon) {
            throw new Error("Pokemon cannot be null or undefined");
        }

        return new FranchiseCreature(
            pokemon.name,
            pokemon.weight,
            pokemon.moves?.map((move) => move.move.name) || [],
            pokemon.evolutions?.map((evolution) => evolution.name) || []
        );
    }

    static FromDigimon(digimon: Digimon): FranchiseCreature {

        if (!digimon) {
            throw new Error("Digimon cannot be null or undefined");
        }

        return new FranchiseCreature(
            digimon.name,
            0,
            digimon.skills?.map((skill) => skill.skill) || [],
            digimon.evolutions?.map((evolution) => evolution.digimon) || []
        );
    }
}