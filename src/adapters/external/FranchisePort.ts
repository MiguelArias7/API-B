import { Configuration } from "../../domain/models/Configuration";
import { Metadata } from "../../domain/models/Metadata";

// FranchisePort is an interface that defines a contract for fetching data from different franchises.
export interface FranchisePort<T> {
    getData(metadata: Metadata, configuration: Configuration): Promise<T>;
}