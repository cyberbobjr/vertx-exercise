import {Injectable} from '@angular/core';
import * as EventBus from 'vertx3-eventbus-client';
import {configuration} from '../../../../configuration';

@Injectable({
                providedIn: 'root'
            })
export class AppsService {
    private eventBus: EventBus.EventBus;

    constructor() {
        this.loadEventBusHandler();
    }

    private loadEventBusHandler() {
        this.eventBus = new EventBus(`http://localhost:${configuration.port}/rt`);
        this.eventBus.enableReconnect(true);
        this.eventBus.publish(configuration.appName, 'front client launched');
        this.eventBus.onopen = () => {
            this.eventBus.publish(configuration.appName, 'front client launched');
        }
    }
}
