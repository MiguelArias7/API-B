import { LogMetadata } from "./LogMetadata";

export class Log {
    constructor(
        public readonly id: string,
        public readonly franchise: string,
        public readonly version: string,
        public readonly metadata: LogMetadata,
        public readonly timestamp: Date = new Date(),
        public readonly status: string,
        public readonly error?: string,
    ) { }
}