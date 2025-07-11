export class Metadata {

    id: string;
    name: string;

    constructor(id: string, name: string) {

        if (!id && !name) {
            throw new Error("Name or id must be provided");
        }

        this.id = id;
        this.name = name;
    }

    static fromObject(obj: unknown): Metadata {
        if (!obj) {
            throw new Error("Cannot create LogMetadata from null or undefined object");
        }
        const { id = "", name = "" } = obj as { id?: string; name?: string };
        return new Metadata(id, name);
    }
}
