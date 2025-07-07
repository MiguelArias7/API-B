import { DigimonEvolution } from "./DigimonEvolution";
import { DigimonSkill } from "./DigimonSkill";

export class Digimon {
    name: string;
    skills: DigimonSkill[];
    evolutions: DigimonEvolution[];

    constructor(name: string, skills: DigimonSkill[], evolutions: DigimonEvolution[]) {
        this.name = name;
        this.skills = skills || [];
        this.evolutions = evolutions || [];
    }
}