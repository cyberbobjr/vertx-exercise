import {Injectable} from '@angular/core';
import * as EventBus from 'vertx3-eventbus-client';
import {configuration} from '../../../../configuration';
import {Observable, Subject} from 'rxjs';
import {BaseService} from './BaseService';
import {HttpClient} from '@angular/common/http';

@Injectable({
                providedIn: 'root'
            })
export class AppsService extends BaseService {
    private eventBus: EventBus.EventBus;
    activityLogs$: Subject<string> = new Subject();

    constructor(private httpClient: HttpClient) {
        super();
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

    loadApps(): Observable<string[]> {
        const url = this.baseUrl + 'widgets/list';
        return this.httpClient.get<string[]>(url);
    }

    loadActiveApps(): Observable<string[]> {
        const url = this.baseUrl + 'widgets/active';
        return this.httpClient.get<string[]>(url);
    }
}

