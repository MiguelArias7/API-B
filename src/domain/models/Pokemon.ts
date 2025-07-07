import { PokemonMove } from "./PokemonMove";

export class Pokemon {
    name: string;
    moves: PokemonMove[];
    weight: number;
    evolutions?: Array<{ id: string, name: string }>;

    constructor(name: string, moves: PokemonMove[], weight: number) {

        this.name = name;
        this.moves = moves;
        this.weight = weight;
    }
}