import { Configuration } from "../../domain/models/Configuration";
import { Metadata } from "../../domain/models/Metadata";

export interface FranchisePort<T> {
    getData(metadata: Metadata, configuration: Configuration): Promise<T>;
}