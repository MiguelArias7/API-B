export class PokemonMove {
    move: { name: string, url: string };
    version_group_details: Array<unknown>;

    constructor(move: { name: string, url: string }, version_group_details: Array<unknown>) {
        this.move = move;
        this.version_group_details = version_group_details;
    }
}