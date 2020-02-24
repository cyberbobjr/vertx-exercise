import {EventBus} from '@vertx/core';
import {BaseApp} from '../interfaces/BaseApp';
import {appContextName} from '../application';

export class ActivityApp extends BaseApp {
    static appName: string = 'Activity';
    private logs: Array<{ ts: number, content: string }> = [];

    constructor(eb: EventBus) {
        super(eb);
        this.eb.consumer(appContextName, (message) => {
            this.logs.push({ts: Date.now(), content: message.body() as string})
        })
    }
}