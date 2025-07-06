export class Log {
    constructor(
        public readonly id: string,
        public readonly franchise: string,
        public readonly version: string,
        public readonly message: string,
        public readonly metadata?: Record<string, any>,
        public readonly status?: string,
        public readonly timestamp: Date = new Date(),
        public readonly error?: string,
    ) { }
}