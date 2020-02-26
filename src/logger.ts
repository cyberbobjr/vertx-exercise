import {EventBus} from '@vertx/core';
import {ILogger} from './interfaces/ILogger';
import {configuration} from '../configuration';

export default class Logger implements ILogger {
    private logs: Array<{ ts: number, source: string, message: string }> = [];

    constructor(private eb: EventBus) {
    }

    emitLog(source: string, message: string) {
        this.logs.push({ts: Date.now(), source, message});
        this.eb.publish(configuration.appName, this.formatLog(this.logs[this.logs.length - 1]));
    }

    getLogsSince(startDate?: number): string[] {
        return this.logs.filter(l => startDate ? l.ts < startDate : true).map(l => this.formatLog(l));
    }

    private formatLog(log: { ts: number, source: string, message: string }): string {
        return `[${new Date(log.ts)}] - [${log.source}] - ${log.message}`
    }
}