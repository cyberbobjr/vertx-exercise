import {EventBus, HttpServerResponse} from '@vertx/core';
import {Router, RoutingContext} from '@vertx/web';

export abstract class BaseApp {
    static url: string;
    static appName: string;

    protected constructor(protected eb: EventBus) {
    }

    start(): void {

    }

    stop(): void {

    }

    isStarted(): boolean {
        return false;
    }

    buildHandler(router: Router) : void {
    }

    requestHandler(routingContext: RoutingContext) {
        const response: HttpServerResponse = routingContext.response();
        response.putHeader('content-type', 'text/plain')
                .end('');
    }

    getUrl(): string {
        return BaseApp.url;
    }
}