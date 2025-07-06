import { STATUS } from "../../const";
import { LogMetadata } from "./LogMetadata";

export class Log {
    constructor(
        public readonly id: string,
        public readonly franchise: string,
        public readonly version: string,
        public readonly metadata: LogMetadata,
        public readonly timestamp: Date = new Date(),
        public readonly status: STATUS = STATUS.SUCCESS,
        public readonly error?: string,
    ) { }
}