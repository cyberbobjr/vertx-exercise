import {Injectable} from '@angular/core';
import * as EventBus from 'vertx3-eventbus-client';
import {configuration} from '../../../../configuration';
import {Subject} from 'rxjs';

@Injectable({
                providedIn: 'root'
            })
export class AppsService {
    private eventBus: EventBus.EventBus;
    activityLogs$: Subject<string> = new Subject();

    constructor() {
        this.loadEventBusHandler();
    }

    private loadEventBusHandler() {
        this.eventBus = new EventBus(`http://localhost:${configuration.port}/rt`);
        this.eventBus.onerror = (err) => {
            console.log(err);
        };
        this.eventBus.onopen = () => {
            this.eventBus.enableReconnect(true);
            this.eventBus.enablePing(true);
            this.eventBus.publish(configuration.appName, 'front client launched');
            this.eventBus.registerHandler(configuration.appName, {}, (err, message) => {
                this.activityLogs$.next(message.body);
            })
        }
    }
}
