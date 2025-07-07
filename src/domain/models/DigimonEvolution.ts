export class DigimonEvolution {
    id: string;
    digimon: string;
    condition: string;

    constructor(id: string, digimon: string, condition: string) {
        this.id = id;
        this.digimon = digimon;
        this.condition = condition;
    }
}