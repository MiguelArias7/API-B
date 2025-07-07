export class DigimonSkill {
    id: string;
    skill: string;
    translation: string;
    description: number;

    constructor(id: string, name: string, type: string, power: number) {
        this.id = id;
        this.skill = name;
        this.translation = type;
        this.description = power;
    }

    // static fromObject(obj: unknown): DigimonSkill {
    //     return new DigimonSkill(obj.id, obj.name, obj.type, obj.power);
    // }
}