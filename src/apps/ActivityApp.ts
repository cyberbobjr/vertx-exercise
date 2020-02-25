import {EventBus} from '@vertx/core';
import {BaseApp} from '../interfaces/BaseApp';
import {configuration} from '../../configuration';

export class ActivityApp extends BaseApp {
    static appName: string = 'Activity';
    protected rootApiUrl: string = '/activity';
    private logs: Array<{ ts: number, content: string }> = [];

    constructor(eb: EventBus) {
        super(eb);
        this.eb.consumer(configuration.appName, (message) => {
            console.log(message.body());
            this.logs.push({ts: Date.now(), content: message.body() as string})
        })
    }
}