export interface ILogger {
    emitLog(source: string, body: string): void;

    getLogsSince(date?: number): string[];
}