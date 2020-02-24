import {EventBus, HttpServerRequest} from '@vertx/core';
import {BaseApp} from '../interfaces/BaseApp';
import {HttpMethod} from '@vertx/core/enums';
import {appContextName} from '../application';
import {AppRoute} from '../interfaces/AppRoute';
import {RoutingContext} from '@vertx/web';

export class NameApp extends BaseApp {
    static url: string = '/name';
    static appName: string = 'NameApp';
    private internalName: string = 'default';
    protected routes: Array<AppRoute> = [
        {path: '', method: HttpMethod.GET, handler: this.getName.bind(this), route: null},
        {path: '', method: HttpMethod.POST, handler: this.postName.bind(this), route: null},
    ];

    constructor(protected eb: EventBus) {
        super(eb);
    }

    private emitMessage(message: string) {
        this.eb.publish(appContextName, message);
    }

    getName(request: HttpServerRequest): string {
        try {
            this.emitMessage('ask for name');
            return this.internalName;
        } catch (e) {
            console.log(e.message);
        }
    }

    postName(request: HttpServerRequest, routingContext: RoutingContext): any {
        try {
            const body: any = routingContext.getBodyAsString();
            this.emitMessage('get new name : ' + body);
            const {name} = JSON.parse(body);
            this.internalName = name;
            return {result: 'ok'};
        } catch (e) {
            console.log(e.message);
            routingContext.fail(500);
        }
    }
}