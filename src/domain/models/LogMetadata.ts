export class LogMetadata {

    id: string;
    name: string;

    constructor(id: string, name: string) {

        if (!id && !name) {
            throw new Error("Name or id must be provided");
        }

        this.id = id;
        this.name = name;
    }
}
