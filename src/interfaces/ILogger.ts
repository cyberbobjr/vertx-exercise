export interface ILogger {
    emitLog(source: string, body: string): void;

    getLogsBefore(date?: number): string[];
}