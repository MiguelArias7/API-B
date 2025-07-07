import { LOG_STATUS } from "../../const";
import { Metadata } from "./Metadata";

export class Log {
    constructor(
        public readonly id: string,
        public readonly franchise: string,
        public readonly version: string,
        public readonly metadata: Metadata,
        public readonly timestamp: Date = new Date(),
        public readonly status: LOG_STATUS = LOG_STATUS.SUCCESS,
        public readonly error?: string,
    ) { }
}