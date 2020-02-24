import {EventBus} from '@vertx/core';
import {BaseApp} from '../interfaces/BaseApp';
import {appContextName} from '../application';

export class ActivityApp extends BaseApp {
    static appName: string = 'Activity';

    constructor(eb: EventBus) {
        super(eb);
        this.eb.consumer(appContextName, (message) => {
            console.log(message.body());
        })
    }

    isStarted(): boolean {
        return false;
    }

    start(): void {
    }

    stop(): void {
    }

}