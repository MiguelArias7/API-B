import { FranchisePort } from "../../adapters/external/FranchisePort";
import { Configuration } from "../../domain/models/Configuration";
import { Metadata } from "../../domain/models/Metadata";

export class DataFindById<T> {
    constructor(private franchisePort: FranchisePort<T>) { }

    async execute(metadata: Metadata, config: Configuration): Promise<T> {
        return this.franchisePort.getData(metadata, config);
    }
}